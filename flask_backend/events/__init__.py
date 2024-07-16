def init_events(socketio):
    from . import bid_events
    bid_events.init_bid_events(socketio)
