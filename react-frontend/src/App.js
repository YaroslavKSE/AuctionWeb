import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import CategoriesPage from './pages/CategoriesPage'
// import ActiveListingsPage from './pages/ActiveListingsPage'
// import CreateListingPage from './pages/CreateListingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
  return (
    <Router>
      <Routes>
        {/*<Route path="/" element={<HomePage />} />*/}
        {/*<Route path="/categories" element={<CategoriesPage />} />*/}
        {/*<Route path="/active-listings" element={<ActiveListingsPage />} />*/}
        {/*<Route path="/create-listing" element={<CreateListingPage />} />*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  )
}

export default App
