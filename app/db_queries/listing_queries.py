from bson import ObjectId
from datetime import datetime
from . import mongo


def insert_listing(listing_data):
    return mongo.db.listings.insert_one(listing_data).inserted_id


def find_all_listings():
    return mongo.db.listings.find()


def update_listing_bid(listing_id, bid_amount, bidder_id):
    mongo.db.listings.update_one(
        {"_id": ObjectId(listing_id)},
        {"$set": {"current_bid": bid_amount, "current_bidder_id": bidder_id, "updated_at": datetime.utcnow()}}
    )


def find_listing_by_id(listing_id):
    return mongo.db.listings.find_one({"_id": ObjectId(listing_id)})
