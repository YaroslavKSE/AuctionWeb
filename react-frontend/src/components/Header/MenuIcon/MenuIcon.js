import React from 'react'
import './MenuIcon.css'

const MenuIcon = ({ onClick }) => {
  return (
    <div className="menu-icon" onClick={onClick}>
      <div className="menu-icon__line"></div>
      <div className="menu-icon__line"></div>
      <div className="menu-icon__line"></div>
    </div>
  )
}

export default MenuIcon
