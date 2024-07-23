import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './Button.css'

const Button = ({ type, children, onClick, variant = 'default' }) => {
  const buttonClass = classNames('button', {
    'transparent': variant === 'transparent'
  })

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

export default Button
