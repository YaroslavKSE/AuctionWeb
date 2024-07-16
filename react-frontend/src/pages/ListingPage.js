import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Layout from '../components/Layout/Layout'
import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import Popup from '../components/Popup/Popup'
import Listing from '../components/Listing/Listing'
import PreviousBids from '../components/PreviousBids/PreviousBids'
import DetailedDescription from '../components/DetailedDescription/DetailedDescription'
import Alert from '../components/Alert/Alert'
import {
  getListingById,
  placeBidSocket,
  addToWatchlist,
  removeFromWatchlist,
  getBidsByListingIdSocket,
  fetchWatchlistIds,
  closeListingSocket
} from '../api'
import socket from '../socket'
import './styles/ListingPage.css'

const ListingPage = () => {
  const { listingId } = useParams()
  const { isAuthenticated, user } = useContext(AuthContext)
  const [listing, setListing] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bids, setBids] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const fetchListingAndBids = async () => {
    try {
      const listingData = await getListingById(listingId)
      setListing(listingData)
      const bidsData = await getBidsByListingIdSocket(listingId)
      setBids(bidsData)
    } catch (error) {
      console.error('Error fetching listing or bids:', error)
    }
  }

  const fetchWatchlistStatus = async () => {
    if (isAuthenticated) {
      try {
        const watchlistIds = await fetchWatchlistIds()
        setIsInWatchlist(watchlistIds.includes(listingId))
      } catch (error) {
        console.error('Error fetching watchlist status:', error)
      }
    }
  }

  useEffect(() => {
    fetchListingAndBids()
    fetchWatchlistStatus()

    // Set up WebSocket listeners
    socket.on('bid_update', (newBid) => {
      if (newBid.listing_id === listingId) {
        setBids((prevBids) => [newBid, ...prevBids])
        setListing((prevListing) => ({
          ...prevListing,
          current_bid: newBid.amount,
          current_bidder_id: newBid.user_id
        }))
      }
    })

    socket.on('listing_closed', (data) => {
      if (data.listing_id === listingId) {
        setListing((prevListing) => ({
          ...prevListing,
          status: 'closed',
          current_bid: data.final_bid,
          current_bidder_id: data.winner_id
        }))
      }
    })

    // Clean up listeners on component unmount
    return () => {
      socket.off('bid_update')
      socket.off('listing_closed')
    }
  }, [listingId, isAuthenticated])

  const handleBidSubmit = async () => {
    console.log("Attempting to place bid:", listingId, bidAmount);
    if (!isAuthenticated) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    try {
      console.log("Calling placeBidSocket");
      await placeBidSocket(listingId, bidAmount)
      console.log("Bid placed successfully");
      setIsSuccess(true)
      setBidAmount('')
    } catch (error) {
      console.error("Error placing bid:", error);
      setErrorMessage(error.message)
      setIsSuccess(false)
    } finally {
      setIsPopupOpen(false)
    }
  }

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    try {
      if (isInWatchlist) {
        await removeFromWatchlist(listingId)
      } else {
        await addToWatchlist(listingId)
      }
      setIsInWatchlist(!isInWatchlist)
    } catch (error) {
      console.error('Error toggling watchlist:', error)
    }
  }

  const handleCloseListing = async () => {
    try {
      await closeListingSocket(listingId)
      setIsSuccess(true)
    } catch (error) {
      setErrorMessage(error.message)
      setIsSuccess(false)
    }
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setIsSuccess(false)
    setErrorMessage('')
  }

  if (!listing) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  const isOwner = user && user.id === listing.owner_id
  const isWinner = listing.status === 'closed' && user && user.id === listing.current_bidder_id

  return (
    <Layout>
      <div className="listing-page">
        {showAlert && (
          <Alert message="You must be logged in to perform this action." type="warning" />
        )}
        <div className="listing-content">
          <h1 className="listing-title">{listing.title}</h1>
          <div className="listing-container">
            <div className="listing-details">
              <Listing
                title={listing.title}
                images={listing.images}
                price={listing.current_bid || listing.starting_bid}
                currency={listing.currency}
                createdAt={listing.created_at}
                owner_id={listing.owner_id}
                listingId={listingId}
                initialIsInWatchlist={isInWatchlist}
                onWatchlistClick={handleWatchlistToggle}
              />
            </div>
          </div>
          <div className="bid-section">
            {listing.status === 'active' && !isOwner && (
              <>
                <TextInput
                  label="Enter new Bid"
                  type="number"
                  placeholder="Enter your bid"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
                <Button
                  onClick={() => (isAuthenticated ? setIsPopupOpen(true) : handleBidSubmit())}
                  className="button"
                  type="submit">
                  Place bid
                </Button>
              </>
            )}
            {isOwner && listing.status === 'active' && (
              <Button onClick={handleCloseListing} className="button" type="button">
                Close Listing
              </Button>
            )}
            {listing.status === 'closed' && (
              <div className="listing-closed-message">
                This listing is closed. The winning bid was {listing.current_bid} {listing.currency}
                .
              </div>
            )}
            {isWinner && (
              <div className="listing-winner-message">Congratulations! You won this auction.</div>
            )}
          </div>
          <div className="current-bid-section">
            <h2>Current Bid</h2>
            <p className="current-bid">
              {listing.current_bid || listing.starting_bid} {listing.currency}
            </p>
          </div>
          <div className="detailed-description-div">
            <DetailedDescription description={listing.description} />
          </div>
          <div className="previous-bids-div">
            <PreviousBids bids={bids} />
          </div>
        </div>
        {isPopupOpen && (
          <Popup
            title="Confirm Bid"
            message="Are you sure you want to place this bid?"
            onConfirm={handleBidSubmit}
            onClose={handleClosePopup}
            errorMessage={errorMessage}
          />
        )}
        {isSuccess && (
          <Popup
            title="Success"
            message={
              isOwner ? 'Your listing has been closed.' : 'Your bid has been placed successfully!'
            }
            onConfirm={handleClosePopup}
            onClose={handleClosePopup}
          />
        )}
        {errorMessage && !isPopupOpen && (
          <Popup
            title="Error"
            message={errorMessage}
            onConfirm={handleClosePopup}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </Layout>
  )
}

export default ListingPage