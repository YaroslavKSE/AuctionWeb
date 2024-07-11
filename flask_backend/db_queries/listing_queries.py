from bson import ObjectId
from datetime import datetime, timezone
from . import mongo


def insert_listing(listing_data):
    listing_data['created_at'] = listing_data['updated_at'] = datetime.now(timezone.utc)
    return mongo.db.listings.insert_one(listing_data).inserted_id


def find_all_listings():
    return list(mongo.db.listings.find())


def update_listing_bid(listing_id, bid_amount, bidder_id):
    mongo.db.listings.update_one(
        {"_id": ObjectId(listing_id)},
        {"$set": {
            "current_bid": int(bid_amount),
            "current_bidder_id": bidder_id,
            "updated_at": datetime.now(timezone.utc)
        }}
    )


def update_listing_status(listing_id, status, winner_id):
    mongo.db.listings.update_one(
        {"_id": ObjectId(listing_id)},
        {"$set": {
            "status": status,
            "winner_id": winner_id,
            "updated_at": datetime.now(timezone.utc)
        }}
    )


def find_listing_by_id(listing_id):
    return mongo.db.listings.find_one({"_id": ObjectId(listing_id)})


def find_listings_by_category(category):
    return list(mongo.db.listings.find({"categories": category}))
