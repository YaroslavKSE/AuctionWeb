import datetime

from bson import ObjectId
from flask_login import current_user
from flask_socketio import emit

from ..db_queries.bid_queries import insert_bid, find_bids_by_listing_id
from ..db_queries.listing_queries import find_listing_by_id, update_listing_bid
from ..models.bid import Bid


def init_bid_events(socketio):
    @socketio.on('place_bid')
    def handle_place_bid(data):
        print("Received place_bid event:", data)
        if not current_user.is_authenticated:
            emit('bid_error', {"error": "User not authenticated"})
            return

        listing_id = data.get('listing_id')
        bid_amount = data.get('amount')

        if not all([listing_id, bid_amount]):
            emit('bid_error', {"error": "Invalid bid data"})
            return

        try:
            bid_amount = int(bid_amount)
        except ValueError:
            emit('bid_error', {"error": "Invalid bid amount"})
            return

        listing = find_listing_by_id(listing_id)

        if not listing:
            emit('bid_error', {"error": "Listing not found"})
            return

        if bid_amount <= listing['starting_bid'] or (
                listing.get('current_bid') and bid_amount <= listing['current_bid']):
            emit('bid_error', {"error": "Bid must be higher than the current highest bid"})
            return

        bid_id = insert_bid({
            "listing_id": ObjectId(listing_id),
            "user_id": ObjectId(current_user.id),
            "amount": bid_amount
        })

        update_listing_bid(listing_id, bid_amount, current_user.id)

        new_bid = Bid({
            "_id": bid_id,
            "listing_id": ObjectId(listing_id),
            "user_id": ObjectId(current_user.id),
            "amount": bid_amount,
        })
        print("Emitting bid_update")

        socketio.emit('bid_update', new_bid.to_dict(), broadcast=True)

    @socketio.on('get_bids')
    def handle_get_bids(data):
        listing_id = data.get('listing_id')
        if not listing_id:
            emit('bid_error', {"error": "Listing ID is required"})
            return

        all_bids = find_bids_by_listing_id(listing_id)
        result = [Bid(bid).to_dict() for bid in all_bids]
        emit('bids_data', result)
