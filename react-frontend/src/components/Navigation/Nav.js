import React from 'react'
import './Nav.css'
import NavLink from './NavLink/NavLink'

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink href="/watchlist" label="Watchlist" />
        <NavLink href="/active-listings" label="Active Listings" />
        <NavLink href="/create-listing" label="Create Listing" />
      </div>
    </nav>
  )
}

export default Nav
