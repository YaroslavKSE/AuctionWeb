from bson import ObjectId
from . import mongo
from datetime import datetime, timezone


def insert_bid(bid_data):
    bid_data['amount'] = int(bid_data['amount'])
    bid_data['created_at'] = datetime.now(timezone.utc)
    return mongo.db.bids.insert_one(bid_data).inserted_id


def find_bids_by_listing_id(listing_id):
    return mongo.db.bids.find({"listing_id": ObjectId(listing_id)}).sort("amount", -1)
