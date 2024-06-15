import React from 'react'
import PropTypes from 'prop-types'
import './Listing.css'

const Listing = ({ image, title, price, createdAt, seller }) => {
  return (
    <div className="listing">
      <img src={image} alt="Listing" className="listing-image" />
      <div className="listing-info">
        <h3>{title}</h3>
        <p>Price: {price}</p>
        <p>Created at: {createdAt}</p>
      </div>
      <div className="seller-info">
        <button>{seller}</button>
      </div>
    </div>
  )
}

Listing.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired
}

export default Listing
