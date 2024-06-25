import React from 'react'
import './Logo.css'
import logo from './Logo.png'

const Logo = () => {
  return (
    <div className="logo" onClick={() => (window.location.href = '/')}>
      <img src={logo} alt="Logo" />
    </div>
  )
}

export default Logo
