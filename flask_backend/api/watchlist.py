from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

from ..db_queries.watchlist_queries import add_to_user_watchlist, remove_from_user_watchlist, get_user_watchlist
from ..db_queries.listing_queries import find_listing_by_id
watchlist = Blueprint('watchlist', __name__)


@watchlist.route('/add', methods=['POST'])
@login_required
def add_to_watchlist():
    data = request.json
    listing_id = data.get('listing_id')

    if not listing_id:
        return jsonify({"error": "Listing ID is required"}), 400

    add_to_user_watchlist(current_user.id, listing_id)

    return jsonify({"message": "Listing added to watchlist"}), 200


@watchlist.route('/remove', methods=['POST'])
@login_required
def remove_from_watchlist():
    data = request.json
    listing_id = data.get('listing_id')

    if not listing_id:
        return jsonify({"error": "Listing ID is required"}), 400

    remove_from_user_watchlist(current_user.id, listing_id)

    return jsonify({"message": "Listing removed from watchlist"}), 200


@watchlist.route('/', methods=['GET'])
@login_required
def get_watchlist_route():
    user_watchlist = get_user_watchlist(current_user.id)

    if not user_watchlist:
        return jsonify({"listings": []}), 200

    # Fetch details of each listing in the watchlist
    listings = []
    for listing_id in user_watchlist['listing_ids']:
        listing = find_listing_by_id(listing_id)
        if listing:
            listings.append({
                "id": str(listing['_id']),
                "title": listing['title'],
                "description": listing['description'],
                "starting_bid": listing['starting_bid'],
                "images": listing.get('images', []),
                "categories": listing.get('categories', []),
                "current_bid": listing.get('current_bid', None),
                "currency": listing.get('currency', None),
                "current_bidder_id": listing.get('current_bidder_id', None),
                "owner_id": listing['owner_id'],
                "status": listing.get('status', 'active'),
                "created_at": listing['created_at'],
                "updated_at": listing['updated_at']
            })

    return jsonify({"listings": listings}), 200


@watchlist.route('/ids', methods=['GET'])
@login_required
def get_watchlist_ids():
    user_watchlist = get_user_watchlist(current_user.id)

    if not user_watchlist:
        return jsonify({"listing_ids": []}), 200

    listing_ids = [str(listing_id) for listing_id in user_watchlist['listing_ids']]
    return jsonify({"listing_ids": listing_ids}), 200
