import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import Listing from '../components/Listing/Listing'
import Button from '../components/Button/Button'
import { getUserListings, closeListing } from '../api'
import './styles/UserListingsPage.css'

const UserListingsPage = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getUserListings()
        setListings(data)
      } catch (error) {
        console.error('Error fetching user listings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const handleCloseListing = async (listingId) => {
    try {
      await closeListing(listingId)
      setListings(
        listings.map((listing) =>
          listing.id === listingId ? { ...listing, status: 'closed' } : listing
        )
      )
    } catch (error) {
      console.error('Error closing listing:', error)
    }
  }

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )

  return (
    <Layout>
      <div className="user-listings-page">
        <h1>Your Listings</h1>
        <div className="listings-container">
          {listings.length === 0 ? (
            <p>You have no listings.</p>
          ) : (
            listings.map((listing) => (
              <div key={listing.id} className="listing-wrapper">
                <Listing
                  images={listing.images}
                  title={listing.title}
                  price={listing.current_bid || listing.starting_bid}
                  currency={listing.currency}
                  createdAt={listing.created_at}
                  listingId={listing.id}
                  initialIsInWatchlist={false}
                />
                {listing.status === 'active' && (
                  <Button
                    onClick={() => handleCloseListing(listing.id)}
                    className="close-listing-button"
                    type={'submit'}>
                    Close Listing
                  </Button>
                )}
                {listing.status === 'closed' && (
                  <div className="listing-closed-message">This listing is closed</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default UserListingsPage
