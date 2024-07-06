import React from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './NavLink.css'

const NavLink = ({ href, label }) => {
  const location = useLocation()
  const isActive = location.pathname === href

  return (
    <a href={href} className={classNames('nav-link', { active: isActive })}>
      {label}
    </a>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default NavLink
