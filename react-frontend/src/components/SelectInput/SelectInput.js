import React from 'react'
import PropTypes from 'prop-types'
import './SelectInput.css'

const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <label className="select-input">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired
}

export default SelectInput
