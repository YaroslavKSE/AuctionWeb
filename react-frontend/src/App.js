import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ActiveListingsPage from './pages/ActiveListingsPage'
import CreateListingPage from './pages/CreateListingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from '../context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/active-listings" element={<ActiveListingsPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
