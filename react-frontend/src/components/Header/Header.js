import React, { useState } from 'react'
import './Header.css'
import Logo from './Logo/Logo'
import MenuIcon from './MenuIcon/MenuIcon'
import Dropdown from './Dropdown/Dropdown'
import Nav from '../Navigation/Nav'

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <MenuIcon onClick={handleDropdownToggle} />
      </div>
      {isDropdownOpen && <Dropdown />}
      <Nav />
    </header>
  )
}

export default Header
