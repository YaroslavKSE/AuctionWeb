from flask import Flask
from flask_pymongo import PyMongo
from flask_login import LoginManager
from flask_cors import CORS
from dotenv import load_dotenv
import os
from .models import User

# Load environment variables from .env file
load_dotenv()

mongo = PyMongo()
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
        user = mongo.db.users.find_one({"_id": user_id})
        if user:
            print("User found", user)
            return User(user)
        print("User not found")
        return None

    from .auth import auth as auth_blueprint
    app.register_blueprint(auth_blueprint)

    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app
