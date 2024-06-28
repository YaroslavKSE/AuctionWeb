import React from 'react'
import Listing from './Listing'

export default {
  title: 'Components/Listing',
  component: Listing
}

const Template = (args) => <Listing {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Macbook Air 14',
  images: ['https://auction-images.fra1.cdn.digitaloceanspaces.com/auction-images/air.jpg'],
  current_bid: 500,
  starting_bid: 400,
  created_at: 'Tue, 25 Jun 2024 09:34:57 GMT',
  owner_id: 'Seller123',
  onWatchlistClick: () => alert('Added to watchlist')
}
