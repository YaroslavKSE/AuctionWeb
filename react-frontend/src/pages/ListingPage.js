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
  placeBid,
  getBidsByListingId,
  closeListing,
  fetchWatchlistIds
} from '../api'
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
  const [watchlist, setWatchlist] = useState([])
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  useEffect(() => {
    const fetchListingAndBids = async () => {
      try {
        const listingData = await getListingById(listingId)
        setListing(listingData)
        const bidsData = await getBidsByListingId(listingId)
        setBids(bidsData)
      } catch (error) {
        console.error('Error fetching listing or bids:', error)
      }
    }

    const fetchUserWatchlist = async () => {
      if (isAuthenticated) {
        try {
          const data = await fetchWatchlistIds()
          // console.log('Fetched watchlist:', data)
          setWatchlist(data)
        } catch (error) {
          console.error('Error fetching watchlist IDs:', error)
        }
      } else {
        setWatchlist([])
      }
    }

    fetchListingAndBids()
    fetchUserWatchlist()
  }, [listingId, isAuthenticated])

  useEffect(() => {
    if (watchlist.length > 0 && listingId) {
      const listingInWatchlist = watchlist.includes(listingId)
      //console.log('Is listing in watchlist:', listingInWatchlist)
      setIsInWatchlist(listingInWatchlist)
    }
  }, [watchlist, listingId])

  const handleBidSubmit = async () => {
    if (!isAuthenticated) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
      return
    }

    try {
      await placeBid(listingId, bidAmount)
      setIsSuccess(true)
      setBidAmount('')
      // Refresh listing and bids after successful bid
      const updatedListing = await getListingById(listingId)
      setListing(updatedListing)
      const updatedBids = await getBidsByListingId(listingId)
      setBids(updatedBids)
    } catch (error) {
      setErrorMessage(error.message)
      setIsSuccess(false)
    } finally {
      setIsPopupOpen(false)
    }
  }

  const handleCloseListing = async () => {
    try {
      await closeListing(listingId)
      setIsSuccess(true)
      // Refresh listing after closing
      const updatedListing = await getListingById(listingId)
      setListing(updatedListing)
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

  if (!listing) return <Layout>
    <div>Loading...</div>
  </Layout>

  const isOwner = user && user.id === listing.owner_id
  const isWinner = listing.status === 'closed' && user && user.id === listing.current_bidder_id

  return (
    <Layout>
      <div className="listing-page">
        {showAlert && <Alert message="You must be logged in to perform this action." type="warning" />}
        <div className="listing-content">
          <h1 className="listing-title">{listing.title}</h1>
          <div className="listing-container">
            <div className="listing-details">
              <Listing
                key={listing.id}
                images={listing.images}
                title={listing.title}
                description={listing.description}
                createdAt={listing.created_at}
                price={listing.current_bid || listing.starting_bid}
                currency={listing.currency}
                seller={'Seller Icon'}
                listingId={listing.id}
                initialIsInWatchlist={isInWatchlist}
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
                  type="submit"
                >
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
                This listing is closed. The winning bid was {listing.current_bid} {listing.currency}.
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
            message={isOwner ? 'Your listing has been closed.' : 'Your bid has been placed successfully!'}
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
