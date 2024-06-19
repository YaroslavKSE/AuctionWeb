import React from 'react'
import PropTypes from 'prop-types'
import './TextInput.css'

const TextInput = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      className="text-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextInput
