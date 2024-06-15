import React, { useEffect, useState } from 'react'
import { getListings } from '../../api'
import Listing from '../Listing/Listing'
import './Listings.css'

const ListingsPage = () => {
  const [listings, setListings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings()
        setListings(data)
      } catch (err) {
        setError(err.error)
      }
    }

    fetchListings().catch((err) => setError(err.error))
  }, [])

  return (
    <div className="listings-page">
      <h2>Active Listings</h2>
      {error && <p className="error">{error}</p>}
      <div className="listings">
        {listings.map((listing) => (
          <Listing
            key={listing.id}
            image={listing.images[0] || 'placeholder.jpg'}
            title={listing.title}
            price={listing.starting_bid}
            createdAt={new Date(listing.created_at).toLocaleString()}
            seller={listing.owner_id}
          />
        ))}
      </div>
    </div>
  )
}

export default ListingsPage
