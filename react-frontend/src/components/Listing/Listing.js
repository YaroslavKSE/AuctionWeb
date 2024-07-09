import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './Listing.css'
import nextIcon from './nextImage.png'
import heartTransparent from './heart_transparent.png' // Replace with your transparent heart icon path
import heartFull from './heart_full.png' // Replace with your full heart icon path
import Alert from '../Alert/Alert' // Import the Alert component

// eslint-disable-next-line no-unused-vars
const Listing = ({ images, title, price, createdAt, seller, onClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  const [alertMessage, setAlertMessage] = useState(null)

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  const handleWatchlistToggle = () => {
    setIsInWatchlist(!isInWatchlist)
    setAlertMessage(isInWatchlist ? 'Removed from watchlist' : 'Added to watchlist')
    setTimeout(() => setAlertMessage(null), 2000) // Hide alert after 2 seconds
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
      <div className="listing__watchlist" onClick={handleWatchlistToggle}>
        <img src={isInWatchlist ? heartFull : heartTransparent} alt="Watchlist" />
      </div>
      {alertMessage && <Alert message={alertMessage} />}
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
