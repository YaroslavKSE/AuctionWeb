import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Header from '../components/Header/Header'
import Nav from '../components/Navigation/Nav'
import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import Popup from '../components/Popup/Popup'
import Listing from '../components/Listing/Listing'
import PreviousBids from '../components/PreviousBids/PreviousBids'
import DetailedDescription from '../components/DetailedDescription/DetailedDescription'
import Alert from '../components/Alert/Alert'
import { getListingById, placeBid, addToWatchlist, getBidsByListingId } from '../api'
import './styles/ListingPage.css'

const ListingPage = () => {
  const { listingId } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const [listing, setListing] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bids, setBids] = useState([])
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await getListingById(listingId)
        setListing(data)
      } catch (error) {
        console.error('Error fetching listing:', error)
      }
    }

    const fetchBids = async () => {
      try {
        const data = await getBidsByListingId(listingId)
        setBids(data)
      } catch (error) {
        console.error('Error fetching bids:', error)
      }
    }

    fetchListing()
    fetchBids()
  }, [listingId])

  const handleBidSubmit = async () => {
    if (!isAuthenticated) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000) // Hide alert after 3 seconds
      return
    }

    try {
      await placeBid(listingId, bidAmount)
      setIsSuccess(true)
      setBidAmount('')
      const updatedBids = await getBidsByListingId(listingId)
      setBids(updatedBids)
    } catch (error) {
      setErrorMessage(error.message)
      setIsSuccess(false)
    } finally {
      setIsPopupOpen(false)
    }
  }

  const handleWatchlist = async () => {
    if (!isAuthenticated) {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000) // Hide alert after 3 seconds
      return
    }

    try {
      await addToWatchlist(listingId)
      alert('Listing added to watchlist')
    } catch (error) {
      console.error('Error adding to watchlist:', error)
    }
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    setIsSuccess(false)
    setErrorMessage('')
  }

  if (!listing) return <div>Loading...</div>

  return (
    <div className="listing-page">
      <Header />
      <Nav />
      {showAlert && <Alert message="You must be logged in to place new bid." type="warning" />}
      <div className="listing-content">
        <h1 className="listing-title">{listing.title}</h1>
        <div className="listing-container">
          <div className="listing-details">
            <Listing
              title={listing.title}
              images={listing.images}
              price={listing.current_bid || listing.starting_bid + ' USD'}
              created_at={listing.created_at}
              owner_id={listing.owner_id}
              onWatchlistClick={handleWatchlist}
            />
          </div>
        </div>
        <div className="bid-section">
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
          message="Your bid has been placed successfully!"
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
  )
}

export default ListingPage
