from datetime import datetime, timezone

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..db_queries.listing_queries import (insert_listing, find_all_listings,
                                          find_listing_by_id, update_listing_status)

from ..db_queries.bid_queries import find_bids_by_listing_id

listings = Blueprint('listings', __name__)


@listings.route('/', methods=['POST'])
@login_required
def create_listing():
    data = request.json
    title = data.get('title')
    description = data.get('description')
    starting_bid = data.get('starting_bid')
    images = data.get('images', [])
    categories = data.get('categories', [])

    if not title or not description or not starting_bid:
        return jsonify({"error": "Title, description, and starting bid are required"}), 400

    listing_id = insert_listing({
        "title": title,
        "description": description,
        "starting_bid": starting_bid,
        "images": images,
        "categories": categories,
        "owner_id": current_user.id,
        "status": "active",
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    })

    return jsonify({"message": "Listing created successfully", "listing_id": str(listing_id)}), 201


@listings.route('/', methods=['GET'])
def get_listings():
    all_listings = find_all_listings()
    result = []
    for listing in all_listings:
        result.append({
            "id": str(listing['_id']),
            "title": listing['title'],
            "description": listing['description'],
            "starting_bid": listing['starting_bid'],
            "current_bid": listing.get('current_bid', None),
            "current_bidder_id": listing.get('current_bidder_id', None),
            "images": listing.get('images', []),
            "categories": listing.get('categories', []),
            "owner_id": listing['owner_id'],
            "created_at": listing['created_at'],
            "updated_at": listing['updated_at']
        })
    return jsonify(result), 200


@listings.route('/<listing_id>', methods=['GET'])
def get_listing_by_id(listing_id):
    listing = find_listing_by_id(listing_id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    result = {
        "id": str(listing['_id']),
        "title": listing['title'],
        "description": listing['description'],
        "starting_bid": listing['starting_bid'],
        "images": listing.get('images', []),
        "categories": listing.get('categories', []),
        "owner_id": listing['owner_id'],
        "created_at": listing['created_at'],
        "updated_at": listing['updated_at'],
        "current_bid": listing.get('current_bid'),
        "current_bidder_id": listing.get('current_bidder_id')
    }
    return jsonify(result), 200


@listings.route('/<listing_id>/close', methods=['POST'])
@login_required
def close_listing(listing_id):
    listing = find_listing_by_id(listing_id)

    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    if listing['owner_id'] != current_user.id:
        return jsonify({"error": "You are not the owner of this listing"}), 403

    bids = find_bids_by_listing_id(listing_id)
    highest_bid = max(bids, key=lambda x: x['amount'], default=None)

    if highest_bid:
        update_listing_status(listing_id, "closed", highest_bid['user_id'])
        winner_id = highest_bid['user_id']
    else:
        update_listing_status(listing_id, "closed", None)
        winner_id = None

    return jsonify({"message": "Listing closed successfully", "winner_id": str(winner_id) if winner_id else None}), 200
