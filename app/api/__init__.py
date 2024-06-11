from flask import Blueprint

api = Blueprint('api', __name__)

from .auth import auth as auth_blueprint

api.register_blueprint(auth_blueprint, url_prefix='/auth')

from .bids import bids as bids_blueprint

api.register_blueprint(bids_blueprint, url_prefix='/bids')

from .listings import listings as listings_blueprint

api.register_blueprint(listings_blueprint, url_prefix='/listings')

from .main import main as main_blueprint

api.register_blueprint(main_blueprint, url_prefix='/main')
