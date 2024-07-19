import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import ActiveListingsPage from './pages/ActiveListingsPage'
import CreateListingPage from './pages/CreateListingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from '../context/AuthContext'
import ListingPage from './pages/ListingPage'
import WatchlistPage from './pages/WatchlistPage'
import UserListingsPage from './pages/UserListingsPage'
import UserBidsPage from './pages/UserBidsPage'
import UnderDevelopmentPage from './pages/UnderDevelopmentPage'

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
          <Route path="/your-listings" element={<UserListingsPage />} />
          <Route path="/your-bids" element={<UserBidsPage />} />
          <Route path="/profile" element={<UnderDevelopmentPage />} />
          <Route path="/help-support" element={<UnderDevelopmentPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
