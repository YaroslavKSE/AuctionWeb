import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo" onClick={() => window.location.reload()}>
        Logo here
      </div>
      <div className="menu-icon" onClick={() => alert('Dropdown for managing user account')}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  )
}

export default Header
