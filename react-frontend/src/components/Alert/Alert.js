import React from 'react'
import PropTypes from 'prop-types'
import './Alert.css'

const Alert = ({ message }) => {
  return <div className="alert">{message}</div>
}

Alert.propTypes = {
  message: PropTypes.string.isRequired
}

export default Alert
