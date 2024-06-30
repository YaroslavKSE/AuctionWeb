import React from 'react'
import Listing from './Listing'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Components/Listing',
  component: Listing
}

const Template = (args) => <Listing {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Macbook Air 14',
  images: ['https://auction-images.fra1.cdn.digitaloceanspaces.com/auction-images/air.jpg'],
  price: 500 + ' USD',
  createdAt: 'Tue, 25 Jun 2024 09:34:57 GMT',
  owner_id: 'Seller123',
  onWatchlistClick: () => alert('Added to watchlist')
}

export const WithMultipleImages = Template.bind({})
WithMultipleImages.args = {
  images: [
    'https://helios-i.mashable.com/imagery/articles/002v6VMLKku9Rbd83ArrdiL/hero-image.fill.size_1200x1200.v1694552559.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0eTjkl-kxSzEaO9A7BruSv1Tkqmkg1el4domePwoLA-xR5Ri8BKsolYuK4v9bLrbBW8&usqp=CAU',
  ],
  title: 'Multiple Images Listing',
  price: '$199.99',
  createdAt: '2024-06-29',
  seller: 'Jane',
  onClick: action('Listing clicked')
}

export const NoImages = Template.bind({})
NoImages.args = {
  images: [],
  title: 'No Images Listing',
  price: '$49.99',
  createdAt: '2024-06-28',
  seller: 'Emily Clark',
  onClick: action('Listing clicked')
}
