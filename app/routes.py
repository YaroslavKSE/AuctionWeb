from flask import Blueprint, jsonify
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/protected', methods=['GET'])
@login_required
def protected():
    return jsonify({"message": f"Hello, {current_user.name}"}), 200
