from datetime import datetime


class AuctionListing:
    def __init__(self, listing):
        self.id = str(listing['_id'])
        self.title = listing['title']
        self.description = listing['description']
        self.starting_bid = listing['starting_bid']
        self.images = listing.get('images', [])
        self.categories = listing.get('categories', [])
        self.owner_id = listing['owner_id']
        self.current_bid = listing.get('current_bid', None)
        self.current_bidder_id = listing.get('current_bidder_id', None)
        self.created_at = listing['created_at']
        self.updated_at = listing['updated_at']
