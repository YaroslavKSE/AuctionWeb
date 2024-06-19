import React from 'react'
import Listing from './Listing'

export default {
  title: 'Listing',
  component: Listing
}

const Template = (args) => <Listing {...args} />

export const Default = Template.bind({})
Default.args = {
  images: ['image1.jpg', 'image2.jpg'],
  name: 'Sample Listing',
  price: '$100',
  createdAt: '2024-06-01',
  seller: 'SellerName'
}
