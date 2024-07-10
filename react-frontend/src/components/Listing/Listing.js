import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Listing.css'
import nextIcon from './nextImage.png'
import heartTransparent from './heart_transparent.png'
import heartFull from './heart_full.png'
import Alert from '../Alert/Alert'
import { AuthContext } from '../../../context/AuthContext'
import { addToWatchlist, removeFromWatchlist } from '../../api'

const Listing = ({
  images,
  title,
  price,
  createdAt,
  // eslint-disable-next-line no-unused-vars
  seller,
  onClick,
  listingId,
  initialIsInWatchlist
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isInWatchlist, setIsInWatchlist] = useState(initialIsInWatchlist)
  const [alertMessage, setAlertMessage] = useState(null)
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      setIsInWatchlist(false)
    }
  }, [isAuthenticated])

  const handleNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  const handleWatchlistToggle = async () => {
    if (!isAuthenticated) {
      setAlertMessage('Please log in to add to watchlist')
      setTimeout(() => setAlertMessage(null), 2000)
      return
    }

    try {
      let response
      if (isInWatchlist) {
        response = await removeFromWatchlist(listingId)
      } else {
        response = await addToWatchlist(listingId)
      }
      setIsInWatchlist(!isInWatchlist)
      setAlertMessage(response.message)
      setTimeout(() => setAlertMessage(null), 2000)
    } catch (error) {
      setAlertMessage('Error updating watchlist')
      setTimeout(() => setAlertMessage(null), 2000)
    }
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
  onClick: PropTypes.func.isRequired,
  listingId: PropTypes.string.isRequired,
  initialIsInWatchlist: PropTypes.bool.isRequired // New prop
}

export default Listing
