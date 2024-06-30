import React from 'react'
import ListingPage from '../ListingPage'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { within, userEvent } from '@storybook/testing-library'
import { http } from 'msw'
import { initialize, mswDecorator } from 'msw-storybook-addon'

// Mock the API response
const handlers = [
  http.get('/api/listings/:listingId', (req, res, ctx) => {
    const { listingId } = req.params
    return res(
      ctx.json({
        id: listingId,
        title: `Sample Listing ${listingId}`,
        images: ['https://via.placeholder.com/150'],
        description: `Description for listing ${listingId}`,
        created_at: '2024-06-30',
        starting_bid: '50 USD',
        current_bid: '75 USD',
        owner_id: 'owner123'
      })
    )
  }),
  http.get('/api/listings/:listingId/bids', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', amount: '55 USD', bidder: 'user1', date: '2024-06-29' },
        { id: '2', amount: '65 USD', bidder: 'user2', date: '2024-06-29' }
      ])
    )
  }),
  http.post('/api/listings/:listingId/bids', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  }),
  http.post('/api/listings/:listingId/watchlist', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  })
]

initialize({
  onUnhandledRequest: 'bypass'
})

export default {
  title: 'Pages/ListingPage',
  component: ListingPage,
  decorators: [
    mswDecorator,
    (Story) => (
      <MemoryRouter initialEntries={['/listing/1']}>
        <Routes>
          <Route path="/listing/:listingId" element={<Story />} />
        </Routes>
      </MemoryRouter>
    )
  ]
}

const Template = (args) => <ListingPage {...args} />

export const Default = Template.bind({})
Default.args = {}

export const WithError = Template.bind({})
// eslint-disable-next-line no-unused-vars
WithError.play = async ({ canvasElement }) => {
  const placeBid = http.post('/api/listings/:listingId/bids', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Failed to place bid' }))
  })
  initialize({
    handlers: [...handlers, placeBid],
    onUnhandledRequest: 'bypass'
  })
}

export const BidSubmission = Template.bind({})
BidSubmission.play = async ({ canvasElement }) => {
  const bidInput = within(canvasElement).getByLabelText('Enter new Bid')
  const placeBidButton = within(canvasElement).getByText('Place bid')

  await userEvent.type(bidInput, '100')
  await userEvent.click(placeBidButton)

  const confirmButton = await within(canvasElement).findByText('Confirm')
  await userEvent.click(confirmButton)

  await within(canvasElement).findByText('Your bid has been placed successfully!')
}
