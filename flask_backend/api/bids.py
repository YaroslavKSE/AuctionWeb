from bson import ObjectId
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..db_queries.bid_queries import insert_bid, find_bids_by_listing_id, find_bids_by_user_id
from ..db_queries.listing_queries import find_listing_by_id, update_listing_bid
from ..models.bid import Bid

bids = Blueprint('bids', __name__)


@bids.route('/<listing_id>/place', methods=['POST'])
@login_required
def place_bid(listing_id):
    data = request.json
    bid_amount = data.get('amount')

    if not bid_amount:
        return jsonify({"error": "Bid amount is required"}), 400

    try:
        bid_amount = int(bid_amount)
    except ValueError:
        return jsonify({"error": "Invalid bid amount"}), 400

    listing = find_listing_by_id(listing_id)

    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    if bid_amount <= listing['starting_bid'] or (listing.get('current_bid') and bid_amount <= listing['current_bid']):
        return jsonify({"error": "Bid must be higher than the current highest bid"}), 400

    bid_id = insert_bid({
        "listing_id": ObjectId(listing_id),
        "user_id": ObjectId(current_user.id),
        "amount": bid_amount
    })

    update_listing_bid(listing_id, bid_amount, current_user.id)

    return jsonify({"message": "Bid placed successfully", "bid_id": str(bid_id)}), 201


@bids.route('/<listing_id>', methods=['GET'])
def get_bids(listing_id):
    all_bids = find_bids_by_listing_id(listing_id)
    result = [Bid(bid).to_dict() for bid in all_bids]
    return jsonify(result), 200


@bids.route('/user', methods=['GET'])
@login_required
def get_user_bids():
    user_bids = find_bids_by_user_id(current_user.id)
    result = []
    for bid in user_bids:
        listing = find_listing_by_id(bid['listing_id'])
        if listing:
            bid_dict = Bid(bid).to_dict()
            bid_dict['listing'] = {
                'id': str(listing['_id']),
                'title': listing['title'],
                'images': listing.get('images', []),
                'currency': listing['currency'],
                'status': listing['status']
            }
            result.append(bid_dict)
    return jsonify(result), 200
