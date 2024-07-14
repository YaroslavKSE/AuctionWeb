import React, { useState, useEffect } from 'react'
import './styles/ActiveListingsPage.css'
import Listing from '../components/Listing/Listing'
import { getListings, fetchWatchlistIds } from '../api'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const ActiveListingsPage = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [watchlist, setWatchlist] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings()
        setListings(data)
      } catch (error) {
        console.error('Error fetching listings:', error)
      } finally {
        setLoading(false)
      }
    }

    const fetchUserWatchlist = async () => {
      try {
        const data = await fetchWatchlistIds()
        setWatchlist(data)
      } catch (error) {
        console.error('Error fetching watchlist IDs:', error)
      }
    }

    fetchListings().catch((error) => console.error('Unhandled error in fetchListings:', error))
    fetchUserWatchlist().catch((error) =>
      console.error('Unhandled error in fetchUserWatchlist:', error)
    )
  }, [])

  return (
    <Layout>
      <div className="active-listings-page">
        <div className="listings-container">
          {loading ? (
            <p>Loading listings...</p>
          ) : listings.length === 0 ? (
            <p>No listings available.</p>
          ) : (
            listings.map((listing) => (
              <Listing
                key={listing.id}
                images={listing.images}
                title={listing.title}
                description={listing.description}
                createdAt={listing.created_at}
                price={listing.current_bid || listing.starting_bid}
                currency={listing.currency}
                seller={'Seller Icon'}
                onClick={() => navigate(`/listing/${listing.id}`)}
                listingId={listing.id}
                initialIsInWatchlist={watchlist.includes(listing.id)}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default ActiveListingsPage
