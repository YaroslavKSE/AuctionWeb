from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from . import mongo
from .models import User

auth = Blueprint('auth', __name__)


@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    surname = data.get('surname')

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    user_id = mongo.db.users.insert_one({
        "email": email,
        "password": hashed_password,
        "name": name,
        "surname": surname
    }).inserted_id

    return jsonify({"message": "User created successfully", "user_id": str(user_id)}), 201


@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = mongo.db.users.find_one({"email": email})
    if user and check_password_hash(user['password'], password):
        user_obj = User(user)
        login_user(user_obj)
        return jsonify({"message": "User logged in successfully"}), 200

    return jsonify({"error": "Invalid credentials"}), 401


@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "User logged out successfully"}), 200
