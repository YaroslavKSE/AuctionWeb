import React from 'react'
import './Nav.css'
import NavLink from './NavLink/NavLink'

const Nav = () => {
  return (
    <nav className="nav">
      <NavLink href="/categories" label="Categories" />
      <NavLink href="/active-listings" label="Active Listings" />
      <NavLink href="/create-listing" label="Create Listing" />
    </nav>
  )
}

export default Nav
