import React from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Header from '../Header/Header'
import Nav from '../Navigation/Nav'

const Layout = ({ children }) => {
  const location = useLocation()
  const showHeaderAndNavigation = !['/login', '/signup', '/'].includes(location.pathname)

  return (
    <>
      {showHeaderAndNavigation && (
        <>
          <Header />
          <Nav />
        </>
      )}
      {children}
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
