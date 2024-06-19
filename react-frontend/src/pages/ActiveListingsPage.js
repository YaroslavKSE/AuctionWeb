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
            name={listing.name}
            price={listing.price}
            createdAt={listing.createdAt}
            seller={listing.seller}
          />
        ))}
      </div>
    </div>
  )
}

export default ActiveListingsPage
