from bson import ObjectId
from . import mongo


def insert_bid(bid_data):
    return mongo.db.bids.insert_one(bid_data).inserted_id


def find_bids_by_listing_id(listing_id):
    return mongo.db.bids.find({"listing_id": ObjectId(listing_id)})
