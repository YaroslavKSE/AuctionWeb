import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Navigation from '../Navigation/Navigation'

const Layout = ({ children }) => {
  const location = useLocation()
  const showHeaderAndNavigation = !['/login', '/register', '/'].includes(location.pathname)

  return (
    <>
      {showHeaderAndNavigation && <Header />}
      {showHeaderAndNavigation && <Navigation />}
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
