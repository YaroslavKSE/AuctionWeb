import React from 'react'
import './Dropdown.css'
import { useNavigate } from 'react-router-dom'
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
      <a href="/edit-profile">Edit Profile</a>
      <a href="/watchlist">Watchlist</a>
      <a href="/help-support">Help & Support</a>
      <a href="/" onClick={handleLogout}>
        Logout
      </a>
    </div>
  )
}

export default Dropdown
