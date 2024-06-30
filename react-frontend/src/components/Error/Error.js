import React from 'react'
import PropTypes from 'prop-types'
import './Error.css'

const Error = ({ message }) => {
  return <div className="error">{message}</div>
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error
