import React from 'react'
import './Logo.css'
import logo from './Logo.png'
import PropTypes from 'prop-types'

const Logo = ({ className }) => {
  return (
    <div className={`logo ${className}`} onClick={() => (window.location.href = '/')}>
      <img src={logo} alt="Logo" />
    </div>
  )
}

Logo.propTypes = {
  className: PropTypes.string
}

export default Logo
