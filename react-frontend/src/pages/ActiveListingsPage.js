import React, { useState, useEffect } from 'react'
import './styles/ActiveListingsPage.css'
import Listing from '../components/Listing/Listing'
import { getListings } from '../api'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout'

const ActiveListingsPage = () => {
  const [listings, setListings] = useState([])
  const navigate = useNavigate()

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
    <Layout>
      <div className="active-listings-page">
        <div className="listings-container">
          {listings.map((listing) => (
            <Listing
              key={listing.id}
              images={listing.images}
              title={listing.title}
              description={listing.description}
              createdAt={listing.created_at}
              price={listing.current_bid || listing.starting_bid + ' USD'}
              seller={'Seller Icon'}
              onClick={() => navigate(`/listing/${listing.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ActiveListingsPage
