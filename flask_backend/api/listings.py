from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..db_queries.bid_queries import find_bids_by_listing_id
from ..db_queries.listing_queries import (insert_listing, find_all_listings,
                                          find_listing_by_id, update_listing_status, find_listings_by_user_id)
from ..models.auction_listing import AuctionListing

listings = Blueprint('listings', __name__)


@listings.route('/', methods=['POST'])
@login_required
def create_listing():
    data = request.json
    required_fields = ['title', 'description', 'starting_bid', 'currency']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Title, description, starting bid, and currency are required"}), 400

    if data['currency'] not in ['UAH', 'USD', 'EUR']:
        return jsonify({"error": "Invalid currency. Must be UAH, USD, or EUR"}), 400

    listing_data = {
        "title": data['title'],
        "description": data['description'],
        "starting_bid": int(data['starting_bid']),
        "images": data.get('images', []),
        "currency": data['currency'],
        "owner_id": current_user.id,
        "status": "active"
    }

    listing_id = insert_listing(listing_data)
    return jsonify({"message": "Listing created successfully", "listing_id": str(listing_id)}), 201


@listings.route('/', methods=['GET'])
def get_listings():
    all_listings = find_all_listings()
    return jsonify([AuctionListing(listing).to_dict() for listing in all_listings]), 200


@listings.route('/<listing_id>', methods=['GET'])
def get_listing_by_id(listing_id):
    listing = find_listing_by_id(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404
    return jsonify(AuctionListing(listing).to_dict()), 200


@listings.route('/user', methods=['GET'])
@login_required
def get_user_listings():
    user_listings = find_listings_by_user_id(current_user.id)
    return jsonify([AuctionListing(listing).to_dict() for listing in user_listings]), 200


@listings.route('/<listing_id>/close', methods=['POST'])
@login_required
def close_listing(listing_id):
    listing = find_listing_by_id(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404
    if str(listing['owner_id']) != current_user.id:
        return jsonify({"error": "You are not the owner of this listing"}), 403

    bids = find_bids_by_listing_id(listing_id)
    highest_bid = max(bids, key=lambda x: x['amount'], default=None) if bids else None

    winner_id = highest_bid['user_id'] if highest_bid else None
    update_listing_status(listing_id, "closed", winner_id)

    updated_listing = find_listing_by_id(listing_id)
    return jsonify({
        "message": "Listing closed successfully",
        "winner_id": str(winner_id) if winner_id else None,
        "listing": AuctionListing(updated_listing).to_dict()
    }), 200
