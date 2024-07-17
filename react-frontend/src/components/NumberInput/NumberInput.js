import React from 'react'
import PropTypes from 'prop-types'
import './NumberInput.css'

const NumberInput = ({ label, value, onChange }) => {
  return (
    <label className="number-input">
      <span>{label}</span>
      <input type="number" value={value} onChange={onChange} />
    </label>
  )
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NumberInput
