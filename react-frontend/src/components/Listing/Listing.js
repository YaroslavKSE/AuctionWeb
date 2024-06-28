import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Listing.css'
import nextIcon from './nextImage.png'

const Listing = ({ images, title, price, createdAt, seller, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  return (
    <div className="listing">
      <div className="listing__image-container">
        <img src={images[currentImageIndex]} alt={title} className="listing__image" />
        <button className="next-image-button" onClick={handleNextImage}>
          <img src={nextIcon} alt="Next" className="next-icon" />
        </button>
      </div>
      <div className="listing__details" onClick={onClick}>
        <div className="listing__title">{title}</div>
        <div className="listing__price">{price}</div>
        <div className="listing__created-at">{createdAt}</div>
      </div>
      <div className="listing__seller">{seller}</div>
    </div>
  )
}

Listing.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  seller: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Listing
