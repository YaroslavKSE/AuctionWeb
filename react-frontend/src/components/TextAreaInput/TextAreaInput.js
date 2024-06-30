import React from 'react'
import PropTypes from 'prop-types'
import './TextAreaInput.css'

const TextAreaInput = ({ label, value, onChange }) => {
  return (
    <div className="textarea-input">
      <label>{label}</label>
      <textarea value={value} onChange={onChange}></textarea>
    </div>
  )
}

TextAreaInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextAreaInput
