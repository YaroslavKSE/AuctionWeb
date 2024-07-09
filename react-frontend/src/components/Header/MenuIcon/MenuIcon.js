import React from 'react'
import './MenuIcon.css'
import PropTypes from 'prop-types'

const MenuIcon = ({ onClick }) => {
  return (
    <div className="menu-icon" onClick={onClick}>
      <span className="menu-icon__line"></span>
      <span className="menu-icon__line"></span>
      <span className="menu-icon__line"></span>
    </div>
  )
}

MenuIcon.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default MenuIcon
