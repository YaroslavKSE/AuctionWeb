import React from 'react'
import './Button.css'
import PropTypes from 'prop-types'

const Button = ({ type, children }) => {
  return (
    <button className="button" type={type}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}
export default Button
