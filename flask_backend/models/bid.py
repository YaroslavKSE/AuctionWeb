class Bid:
    def __init__(self, bid):
        self.id = str(bid['_id'])
        self.listing_id = str(bid['listing_id'])
        self.user_id = str(bid['user_id'])
        self.amount = bid['amount']
        self.created_at = bid['created_at']
