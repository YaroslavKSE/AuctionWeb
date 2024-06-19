import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Listing.css'

const Listing = ({ images, name, price, createdAt, seller }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  return (
    <div className="listing">
      <div className="listing__image-container" onClick={handleNextImage}>
        <img src={images[currentImageIndex]} alt={name} className="listing__image" />
      </div>
      <div className="listing__details">
        <div className="listing__name">{name}</div>
        <div className="listing__price">{price}</div>
        <div className="listing__created-at">{createdAt}</div>
      </div>
      <div className="listing__seller">{seller}</div>
    </div>
  )
}

Listing.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired
}

export default Listing
