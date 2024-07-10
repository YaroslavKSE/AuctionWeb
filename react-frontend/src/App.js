import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ActiveListingsPage from './pages/ActiveListingsPage'
import CreateListingPage from './pages/CreateListingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from '../context/AuthContext'
import ListingPage from './pages/ListingPage'
import WatchlistPage from './pages/WatchlistPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/active-listings" />} />
          <Route path="/active-listings" element={<ActiveListingsPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
