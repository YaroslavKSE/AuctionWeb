import React from 'react'
import PropTypes from 'prop-types'
import './PreviousBids.css'

const PreviousBids = ({ bids }) => {
  return (
    <div className="previous-bids">
      <h3>Previous Bids</h3>
      <div className="bids-list">
        {bids.map((bid) => (
          <div key={bid.id} className="bid">
            {bid.amount} - {bid.user_id}
          </div>
        ))}
      </div>
    </div>
  )
}

PreviousBids.propTypes = {
  bids: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      user_id: PropTypes.string.isRequired
    })
  ).isRequired
}

export default PreviousBids
