import React from 'react'
import PropTypes from 'prop-types'
import './Button.css'

const Button = ({ type, children, onClick, variant }) => {
  const buttonClass = variant === 'transparent' ? 'button transparent' : 'button'

  return (
    <button className={buttonClass} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'transparent'])
}

Button.defaultProps = {
  variant: 'default'
}

export default Button
