import os
import logging
from flask import Flask
from flask_login import LoginManager
from flask_cors import CORS
from dotenv import load_dotenv
from bson import ObjectId
from .models.user import User
from .db_queries import mongo

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
    login_manager.login_view = 'auth.login'

    # Enable CORS with credentials
    CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

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


flask_app = create_app()

if __name__ == "__main__":
    flask_app.run(host="0.0.0.0", port=5000)
