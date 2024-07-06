import React from 'react'
import PropTypes from 'prop-types'
import './TextAreaInput.css'

const TextAreaInput = ({ label, value, onChange }) => {
  return (
    <label className="textarea-input">
      <span>{label}</span>
      <textarea value={value} onChange={onChange}></textarea>
    </label>
  )
}

TextAreaInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextAreaInput
