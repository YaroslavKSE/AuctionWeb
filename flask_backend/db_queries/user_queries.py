from bson import ObjectId
from . import mongo


def find_user_by_email(email):
    return mongo.db.users.find_one({"email": email})


def insert_user(user_data):
    return mongo.db.users.insert_one(user_data).inserted_id


def find_user_by_id(user_id):
    return mongo.db.users.find_one({"_id": ObjectId(user_id)})
