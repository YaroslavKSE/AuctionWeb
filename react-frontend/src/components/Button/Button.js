import React from 'react'
import './Button.css'
import PropTypes from 'prop-types'

const Button = ({ type, children, onClick }) => {
  return (
    <button className="button" type={type} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default Button
