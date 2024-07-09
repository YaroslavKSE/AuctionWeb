import React from 'react'
import PropTypes from 'prop-types'
import './Popup.css'
import Button from '../Button/Button'
import Error from '../Error/Error'

const Popup = ({ title, message, onConfirm, onClose, errorMessage }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        {errorMessage && <Error message={errorMessage} />}
        <p>{message}</p>
        <div className="popup-buttons">
          <Button onClick={onConfirm} type="button">
            Confirm
          </Button>
          <Button onClick={onClose} type="button" variant="transparent">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

export default Popup
