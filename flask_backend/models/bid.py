from datetime import datetime


class Bid:
    def __init__(self, bid):
        self.id = str(bid['_id'])
        self.listing_id = str(bid['listing_id'])
        self.user_id = str(bid['user_id'])
        self.amount = int(bid['amount'])
        self.created_at = bid['created_at']

    def to_dict(self):
        return {
            "id": self.id,
            "listing_id": self.listing_id,
            "user_id": self.user_id,
            "amount": self.amount,
            "created_at": self.created_at.isoformat() if isinstance(self.created_at, datetime) else None
        }
