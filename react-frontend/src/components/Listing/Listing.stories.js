import React from 'react'
import Listing from './Listing'

export default {
  title: 'Components/Listing',
  component: Listing,
  tags: ['autodocs']
}

export const Default = () => (
  <Listing
    image="https://via.placeholder.com/150"
    title="Sample Listing"
    price={100}
    createdAt="2023-06-15T00:00:00Z"
    seller="seller123"
  />
)
