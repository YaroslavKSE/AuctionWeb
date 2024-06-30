import React from 'react'
import './Dropdown.css'

const Dropdown = () => {
  return (
    <div className="dropdown">
      <a href="/edit-profile">Edit Profile</a>
      <a href="/watchlist">Watchlist</a>
      <a href="/help-support">Help & Support</a>
      <a href="/logout">Logout</a>
    </div>
  )
}

export default Dropdown
