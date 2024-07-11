class AuctionListing:
    def __init__(self, listing):
        self.id = str(listing['_id'])
        self.title = str(listing['title'])
        self.description = str(listing['description'])
        self.starting_bid = int(listing['starting_bid'])
        self.images = list(listing.get('images', []))
        self.categories = list(listing.get('categories', []))
        self.owner_id = str(listing['owner_id'])
        self.current_bid = int(listing['current_bid']) if listing.get('current_bid') is not None else None
        self.current_bidder_id = str(listing['current_bidder_id']) if listing.get('current_bidder_id') else None
        self.status = str(listing.get('status', 'active'))
        self.created_at = listing['created_at']
        self.updated_at = listing['updated_at']

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'starting_bid': self.starting_bid,
            'images': self.images,
            'categories': self.categories,
            'owner_id': self.owner_id,
            'current_bid': self.current_bid,
            'current_bidder_id': self.current_bidder_id,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @classmethod
    def from_dict(cls, listing_dict):
        return cls(listing_dict)