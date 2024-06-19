import React from 'react'
import './Logo.css'

const Logo = () => {
  return (
    <div className="logo" onClick={() => (window.location.href = '/')}>
      <img src="logo.png" alt="Logo" />
    </div>
  )
}

export default Logo
