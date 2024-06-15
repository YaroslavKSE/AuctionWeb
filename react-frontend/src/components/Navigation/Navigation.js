import React from 'react'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="navigation">
      <button onClick={() => alert('Categories dropdown')}>Categories</button>
      <button onClick={() => window.location.reload()} className="active">
        Active Listings
      </button>
      <button onClick={() => alert('Create Listing dropdown')}>Create Listing</button>
    </nav>
  )
}

export default Navigation
