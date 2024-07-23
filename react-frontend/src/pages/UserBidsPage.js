import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Listing from '../components/Listing/Listing'
import './styles/UserBidsPage.css'
import { getUserBids } from '../api'
import Alert from '../components/Alert/Alert'

const UserBidsPage = () => {
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const data = await getUserBids()
        setBids(data)
      } catch (error) {
        console.error('Error fetching user bids:', error)
        setError('Failed to fetch your bids. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserBids()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="user-bids-page">
          <h1>Your Bids</h1>
          <div className="loading">Loading your bids...</div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="user-bids-page">
          <h1>Your Bids</h1>
          <Alert message={error} type="error" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="user-bids-page">
        <h1 className="bids-title">Your Bids</h1>
        {bids.length === 0 ? (
          <div className="no-bids">You haven't placed any bids yet.</div>
        ) : (
          <div className="bids-container">
            {bids.map((bid) => (
              <div key={bid.id} className="bid-item">
                <Listing
                  images={bid.listing.images}
                  title={bid.listing.title}
                  price={bid.amount}
                  currency={bid.listing.currency}
                  createdAt={bid.created_at}
                  listingId={bid.listing.id}
                  initialIsInWatchlist={false}
                  onClick={() => navigate(`/listing/${bid.listing.id}`)}
                />
                <div className="bid-details">
                  <p className="bid-amount">
                    Your bid: {bid.amount} {bid.listing.currency}
                  </p>
                  <p className="bid-status">
                    Status:{' '}
                    <span className={`status-${bid.listing.status.toLowerCase()}`}>
                      {bid.listing.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

export default UserBidsPage
