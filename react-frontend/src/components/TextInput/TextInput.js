import React from 'react'
import PropTypes from 'prop-types'
import './TextInput.css'

const TextInput = ({ type, placeholder, value, onChange, label }) => {
  return (
    <label className="text-input-container">
      {label && <span className="text-input-label">{label}</span>}
      <input
        className="text-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
}

export default TextInput
