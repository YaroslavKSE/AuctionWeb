import React from 'react'
import { useLocation } from 'react-router-dom'
import './NavLink.css'
import PropTypes from 'prop-types'

const NavLink = ({ href, label }) => {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <a href={href} className={`nav-link ${isActive ? 'active' : ''}`}>
      {label}
    </a>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}
export default NavLink
