from flask import Blueprint, jsonify
from ..db_queries.listing_queries import find_listings_by_category

categories = Blueprint('categories', __name__)


@categories.route('/<category>', methods=['GET'])
def get_listings_by_category(category):
    listings = find_listings_by_category(category)
    result = []
    for listing in listings:
        result.append({
            "id": str(listing['_id']),
            "title": listing['title'],
            "description": listing['description'],
            "starting_bid": listing['starting_bid'],
            "images": listing.get('images', []),
            "categories": listing.get('categories', []),
            "owner_id": listing['owner_id'],
            "status": listing['status'],
            "created_at": listing['created_at'],
            "updated_at": listing['updated_at']
        })
    return jsonify(result), 200
