import React, { useState, useEffect, useContext } from 'react'
import './styles/ActiveListingsPage.css'
import Listing from '../components/Listing/Listing'
import { getListings, fetchWatchlistIds } from '../api'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { AuthContext } from '../../context/AuthContext'

const ActiveListingsPage = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [watchlist, setWatchlist] = useState([])
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const listingsData = await getListings()
        setListings(listingsData)

        if (isAuthenticated) {
          const watchlistData = await fetchWatchlistIds()
          setWatchlist(watchlistData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load listings. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated])

  return (
    <Layout>
      <div className="active-listings-page">
        {error && <p className="error-message">{error}</p>}
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
