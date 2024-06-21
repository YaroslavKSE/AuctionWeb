from datetime import datetime, timezone

from bson import ObjectId
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from ..db_queries.bid_queries import insert_bid, find_bids_by_listing_id
from ..db_queries.listing_queries import find_listing_by_id, update_listing_bid

bids = Blueprint('bids', __name__)


@bids.route('/<listing_id>/place', methods=['POST'])
@login_required
def place_bid(listing_id):
    data = request.json
    bid_amount = data.get('amount')

    if not bid_amount:
        return jsonify({"error": "Bid amount is required"}), 400

    listing = find_listing_by_id(listing_id)

    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    if bid_amount <= listing['starting_bid'] or (listing.get('current_bid') and bid_amount <= listing['current_bid']):
        return jsonify({"error": "Bid must be higher than the current highest bid"}), 400

    bid_id = insert_bid({
        "listing_id": ObjectId(listing_id),
        "user_id": ObjectId(current_user.id),
        "amount": bid_amount,
        "created_at": datetime.now(timezone.utc)
    })

    update_listing_bid(listing_id, bid_amount, current_user.id)

    return jsonify({"message": "Bid placed successfully", "bid_id": str(bid_id)}), 201


@bids.route('/<listing_id>', methods=['GET'])
def get_bids(listing_id):
    all_bids = find_bids_by_listing_id(listing_id)
    result = []
    for bid in all_bids:
        result.append({
            "id": str(bid['_id']),
            "listing_id": str(bid['listing_id']),
            "user_id": str(bid['user_id']),
            "amount": bid['amount'],
            "created_at": bid['created_at']
        })
    return jsonify(result), 200
