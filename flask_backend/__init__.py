import os
import logging
from flask import Flask, make_response, request
from flask_login import LoginManager
from flask_cors import CORS
from dotenv import load_dotenv
from bson import ObjectId
from .models.user import User
from .db_queries import mongo
from .api.images import images

# Enable logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables from .env file
load_dotenv()

login_manager = LoginManager()


def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["SECRET_KEY"] = os.urandom(24)  # Secret key for session management

    app.config.update(
        SESSION_COOKIE_SECURE=False,  # Set to True if using HTTPS
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
    )

    mongo.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'api.auth.login'

    # Enable CORS with credentials
    CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URI")}}, supports_credentials=True)

    # Handle OPTIONS requests globally
    @app.before_request
    def handle_options_request():
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
            response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, "
                                                                 "Authorization")
            response.headers.add("Access-Control-Allow-Credentials", "true")

            return response

    # User loader callback for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        try:
            user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
            if user:
                logging.debug(f"User loaded: {user}")
                return User(user)
        except Exception as e:
            logging.error(f"Error loading user: {e}")
        logging.debug("User not found")
        return None

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app
