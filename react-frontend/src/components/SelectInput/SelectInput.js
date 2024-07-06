import React from 'react'
import PropTypes from 'prop-types'
import './SelectInput.css'

const SelectInput = ({ label, value, onChange }) => {
  return (
    <label className="select-input">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        <option value="" disabled>
          Select a category
        </option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>
    </label>
  )
}

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default SelectInput
