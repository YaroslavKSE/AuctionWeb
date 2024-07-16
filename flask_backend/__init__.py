import os
import logging
from flask import Flask, make_response, request
from flask_login import LoginManager, current_user, login_user
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from dotenv import load_dotenv
from bson import ObjectId
from .models.user import User
from .db_queries import mongo
from .api.images import images
from werkzeug.middleware.proxy_fix import ProxyFix

# Enable logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables from .env file
load_dotenv()

login_manager = LoginManager()

socketio = SocketIO(cors_allowed_origins="*", async_mode='eventlet', manage_session=False, logger=True,
                    engineio_logger=True)


def create_app():
    app = Flask(__name__)

    # Use ProxyFix only in production
    if os.getenv('FLASK_ENV') == 'production':
        app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", os.urandom(24))
    app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB

    # Use environment variable to determine if HTTPS is being used
    use_https = os.getenv('USE_HTTPS', 'false').lower() == 'true'

    app.config.update(
        SESSION_COOKIE_SECURE=use_https,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax',
    )

    mongo.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'api.auth.login'

    socketio.init_app(app)

    @socketio.on('connect')
    def connect():
        if not current_user.is_authenticated:
            user_id = request.cookies.get('user_id')  # Assuming you store user_id in a cookie
            if user_id:
                user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
                if user:
                    login_user(user)
                    print(f"User authenticated: {user.id}")
                else:
                    print("User not found")
            else:
                print("No user_id in cookie")
        else:
            print(f"User already authenticated: {current_user.id}")

    @socketio.on('ping')
    def handle_ping():
        print("Received ping")
        emit('pong', {'data': 'Pong'})

    @socketio.on('disconnect')
    def test_disconnect():
        logging.warning('Client disconnected')

    @socketio.on_error_default
    def default_error_handler(e):
        logging.error('An error occurred:', str(e))
        socketio.emit('error', {'message': str(e)})

    # Enable CORS with credentials
    CORS(app, resources={r"/api/*": {"origins": os.getenv("FRONTEND_URI")}}, supports_credentials=True)

    # Handle OPTIONS requests globally
    @app.before_request
    def handle_options_request():
        if request.method == 'OPTIONS':
            response = make_response('', 200)
            response.headers.add("Access-Control-Allow-Origin", os.getenv("FRONTEND_URI"))
            response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
            response.headers.add("Access-Control-Allow-Headers",
                                 "Origin, X-Requested-With, Content-Type, Accept, Authorization")
            response.headers.add("Access-Control-Allow-Credentials", "true")
            return response

    # User loader callback for Flask-Login
    @login_manager.user_loader
    def load_user(user_id):
        try:
            user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
            if user:
                return User(user)
        except Exception as e:
            logging.error(f"Error loading user: {e}")
        return None

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    from .events import init_events
    init_events(socketio)

    return app
