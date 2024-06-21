import React from 'react'
import PropTypes from 'prop-types'
import './NumberInput.css'

const NumberInput = ({ label, value, onChange }) => {
  return (
    <div className="number-input">
      <label>{label}</label>
      <input type="number" value={value} onChange={onChange} />
    </div>
  )
}

NumberInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default NumberInput
