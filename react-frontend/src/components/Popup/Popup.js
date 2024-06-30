import React from 'react'
import PropTypes from 'prop-types'
import './Popup.css'

const Popup = ({ title, message, onConfirm, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Popup
