import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import Nav from '../components/Navigation/Nav'
import TextInput from '../components/TextInput/TextInput'
import Button from '../components/Button/Button'
import Popup from '../components/Popup/Popup'
import Listing from '../components/Listing/Listing'
import PreviousBids from '../components/PreviousBids/PreviousBids'
import DetailedDescription from '../components/DetailedDescription/DetailedDescription'
import { getListingById, placeBid, addToWatchlist, getBidsByListingId } from '../api'
import './styles/ListingPage.css'

const ListingPage = () => {
  const { listingId } = useParams()
  const [listing, setListing] = useState(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [bids, setBids] = useState([])

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
    try {
      console.log('Submitting bid:', bidAmount)
      await placeBid(listingId, bidAmount)
      setIsSuccess(true)
      setBidAmount('')
      const updatedBids = await getBidsByListingId(listingId)
      setBids(updatedBids)
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to place bid')
      setIsSuccess(false)
    } finally {
      setIsPopupOpen(false)
    }
  }

  const handleWatchlist = async () => {
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
      <div className="listing-title">{listing.title}</div>
      <Listing
        title={listing.title}
        images={listing.images}
        price={listing.current_bid || listing.starting_bid + ' USD'}
        created_at={listing.created_at}
        owner_id={listing.owner_id}
        onWatchlistClick={handleWatchlist}
      />
      <div className="bid-section">
        <TextInput
          label="Enter new Bid"
          type="number"
          placeholder="Enter your bid"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <Button
          onClick={() => {
            console.log('Button clicked')
            setIsPopupOpen(true)
          }}
          class="button"
          type="submit">
          Place bid
        </Button>
        <PreviousBids bids={bids} />
      </div>
      <DetailedDescription description={listing.description} />
      {isPopupOpen && (
        <Popup
          title="Confirm Bid"
          message="Are you sure you want to place this bid?"
          onConfirm={handleBidSubmit}
          onClose={handleClosePopup}
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
      {errorMessage && (
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
