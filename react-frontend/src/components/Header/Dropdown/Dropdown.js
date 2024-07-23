import React from 'react'
import './Dropdown.css'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../api'

const Dropdown = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="dropdown">
      <Link to="/profile">Edit Profile</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/your-bids">Your Bids</Link>
      <Link to="/your-listings">Your Listings</Link>
      <Link to="/help-support">Help & Support</Link>
      <Link to="/" onClick={handleLogout}>
        Logout
      </Link>
    </div>
  )
}

export default Dropdown