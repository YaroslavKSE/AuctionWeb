class Watchlist:
    def __init__(self, watchlist):
        self.id = str(watchlist['_id'])
        self.user_id = str(watchlist['user_id'])
        self.listing_ids = watchlist['listing_ids']
