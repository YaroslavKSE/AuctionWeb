import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

// Provide an initial value for the context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null
})

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/check`, {
          withCredentials: true
        })
        setIsAuthenticated(response.data.isAuthenticated)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        throw error
      }
    }

    checkAuth().catch((error) => {
      console.error('Error checking authentication:', error)
    })
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, user }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AuthProvider
