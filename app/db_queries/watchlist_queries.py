from bson import ObjectId
from . import mongo


def add_to_user_watchlist(user_id, listing_id):
    return mongo.db.watchlists.update_one(
        {"user_id": ObjectId(user_id)},
        {"$addToSet": {"listing_ids": ObjectId(listing_id)}},
        upsert=True
    )


def remove_from_user_watchlist(user_id, listing_id):
    return mongo.db.watchlists.update_one(
        {"user_id": ObjectId(user_id)},
        {"$pull": {"listing_ids": ObjectId(listing_id)}}
    )


def get_user_watchlist(user_id):
    return mongo.db.watchlists.find_one({"user_id": ObjectId(user_id)})
