import React, { useState, useEffect } from 'react'
import './styles/ActiveListingsPage.css'
import Header from '../components/Header/Header'
import Listing from '../components/Listing/Listing'
import { getListings } from '../api'

const ActiveListingsPage = () => {
  const [listings, setListings] = useState([])

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings()
        setListings(data)
      } catch (error) {
        console.error('Error fetching listings:', error)
      }
    }

    fetchListings()
  }, [])

  return (
    <div className="active-listings-page">
      <Header />
      <div className="listings-container">
        {listings.map((listing) => (
          <Listing
            key={listing.id}
            images={listing.images}
            title={listing.title}
            description={listing.description}
            startingBid={listing.starting_bid}
            createdAt={listing.created_at}
            seller={listing.owner_id}
          />
        ))}
      </div>
    </div>
  )
}

export default ActiveListingsPage
