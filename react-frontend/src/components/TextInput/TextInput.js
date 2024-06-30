import React from 'react'
import PropTypes from 'prop-types'
import './TextInput.css'

const TextInput = ({ type, placeholder, value, onChange, label }) => {
  return (
    <div className="text-input-container">
      {label && <label className="text-input-label">{label}</label>}
      <input
        className="text-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
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
