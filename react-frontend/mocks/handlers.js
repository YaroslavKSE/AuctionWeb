import { http } from 'msw'

export const handlers = [
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
  }),
  http.post('/api/listings', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }))
  })
]
