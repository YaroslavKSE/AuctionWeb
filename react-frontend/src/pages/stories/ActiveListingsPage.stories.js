import React from 'react'
import ActiveListingsPage from '../ActiveListingsPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { http } from 'msw'
import { initialize, mswDecorator } from 'msw-storybook-addon'

// Mock the API response
http.get('/api/listings', (req, res, ctx) => {
  return res(
    ctx.json([
      {
        id: '1',
        images: ['https://auction-images.fra1.cdn.digitaloceanspaces.com/auction-images/air.jpg'],
        title: 'Sample Listing 1',
        description: 'Description for listing 1',
        created_at: '2024-06-30',
        starting_bid: '50 USD'
      },
      {
        id: '2',
        images: [
          'https://helios-i.mashable.com/imagery/articles/002v6VMLKku9Rbd83ArrdiL/hero-image.fill.size_1200x1200.v1694552559.jpg'
        ],
        title: 'Sample Listing 2',
        description: 'Description for listing 2',
        created_at: '2024-06-29',
        current_bid: '75 USD'
      }
    ])
  )
})
initialize({
  onUnhandledRequest: 'bypass'
})

export default {
  title: 'Pages/ActiveListingsPage',
  component: ActiveListingsPage,
  decorators: [
    mswDecorator,
    (Story) => (
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <ActiveListingsPage {...args} />

export const Default = Template.bind({})
Default.args = {}
