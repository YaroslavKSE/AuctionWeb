import React from 'react'
import './MenuIcon.css'
import PropTypes from 'prop-types'

const MenuIcon = ({ onClick }) => {
  return (
    <div className="menu-icon" onClick={onClick}>
      <div className="menu-icon__line"></div>
      <div className="menu-icon__line"></div>
      <div className="menu-icon__line"></div>
    </div>
  )
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default MenuIcon
