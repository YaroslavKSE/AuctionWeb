from datetime import datetime, timezone

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..db_queries.listing_queries import insert_listing, find_all_listings

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
            "images": listing.get('images', []),
            "categories": listing.get('categories', []),
            "owner_id": listing['owner_id'],
            "created_at": listing['created_at'],
            "updated_at": listing['updated_at']
        })
    return jsonify(result), 200
