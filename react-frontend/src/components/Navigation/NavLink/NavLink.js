import React from 'react'
import { useLocation } from 'react-router-dom'
import './NavLink.css'

const NavLink = ({ href, label }) => {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <a href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
      {label}
    </a>
  )
}

export default NavLink
