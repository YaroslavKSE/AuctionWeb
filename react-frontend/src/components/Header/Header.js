import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'
import Logo from './Logo/Logo'
import MenuIcon from './MenuIcon/MenuIcon'
import Dropdown from './Dropdown/Dropdown'
import { AuthContext } from '../../../context/AuthContext'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { isAuthenticated, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDropdownToggle = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen)
    } else {
      navigate('/login')
    }
  }

  const handleLogoClick = () => {
    navigate('/active-listings')
  }

  const handleGreetingClick = () => {
    if (isAuthenticated) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  return (
    <header className="header">
      <div className="header__logo" onClick={handleLogoClick}>
        <Logo />
      </div>
      <div className="header__center">
        {isAuthenticated ? (
          <span onClick={handleGreetingClick}>Hello, {user.name}</span>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </>
        )}
      </div>
      <div className="header__menu">
        <MenuIcon onClick={handleDropdownToggle} />
        {isDropdownOpen && <Dropdown className="header__dropdown" />}
      </div>
    </header>
  )
}

export default Header
