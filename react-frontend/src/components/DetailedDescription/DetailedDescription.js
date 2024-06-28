import React from 'react'
import PropTypes from 'prop-types'
import './DetailedDescription.css'

const DetailedDescription = ({ description }) => {
  return (
    <div className="detailed-description">
      <h3>Detailed Description</h3>
      <p>{description}</p>
    </div>
  )
}

DetailedDescription.propTypes = {
  description: PropTypes.string.isRequired
}

export default DetailedDescription
