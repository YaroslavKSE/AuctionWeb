import React, { useState, useEffect, useContext } from 'react'
import './styles/WatchlistPage.css'
import Listing from '../components/Listing/Listing'
import { fetchUserWatchlist } from '../api'
import Layout from '../components/Layout/Layout'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const WatchlistPage = () => {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await fetchUserWatchlist()
        setListings(data)
      } catch (error) {
        console.error('Error fetching watchlist:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchWatchlist().catch((error) => console.error('Unhandled error in fetchWatchlist:', error))
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  return (
    <Layout>
      <div className="watchlist-page">
        <h1 className="watchlist-title">Your Watchlist</h1>
        <div className="listings-container">
          {loading ? (
            <p>Loading watchlist...</p>
          ) : listings.length === 0 ? (
            <p>No items in your watchlist.</p>
          ) : (
            listings.map((listing) => (
              <Listing
                key={listing.id}
                images={listing.images}
                title={listing.title}
                description={listing.description}
                createdAt={listing.created_at}
                price={(listing.current_bid || listing.starting_bid) + ' USD'}
                seller={'Seller Icon'}
                onClick={() => navigate(`/listing/${listing.id}`)}
                listingId={listing.id}
                initialIsInWatchlist={true} // Items in watchlist will be marked as true initially
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}

export default WatchlistPage
