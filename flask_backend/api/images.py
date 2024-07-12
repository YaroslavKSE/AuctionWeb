import os
import boto3
import logging
from flask import Blueprint, request, jsonify
# from flask_login import login_required
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

images = Blueprint('images', __name__)

load_dotenv()

# DigitalOcean Spaces credentials
DO_ACCESS_KEY = os.getenv('DO_ACCESS_KEY')
DO_SECRET_KEY = os.getenv('DO_SECRET_KEY')
DO_SPACE_REGION = os.getenv('DO_SPACE_REGION')
DO_SPACE_BUCKET = os.getenv('DO_SPACE_BUCKET')
DO_SPACE_ENDPOINT = os.getenv('DO_SPACE_ENDPOINT')

# Initialize the S3 client
s3_client = boto3.client(
    's3',
    region_name=DO_SPACE_REGION,
    endpoint_url=DO_SPACE_ENDPOINT,
    aws_access_key_id=DO_ACCESS_KEY,
    aws_secret_access_key=DO_SECRET_KEY
)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'heic', 'heif', 'mov'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@images.route('/upload', methods=['POST'])
# @login_required
def upload_file():
    logging.debug("Starting file upload process")
    if 'image' not in request.files:
        logging.error("No file part in the request")
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        logging.error("No selected file")
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        try:
            logging.debug(f"Uploading file: {filename}")
            s3_client.upload_fileobj(
                file,
                DO_SPACE_BUCKET,
                filename,
                ExtraArgs={
                    'ACL': 'public-read',
                    'ContentType': file.content_type
                }
            )
            image_url = f'{DO_SPACE_ENDPOINT}/{DO_SPACE_BUCKET}/{filename}'
            logging.debug(f"File uploaded successfully: {image_url}")
            return jsonify({'imageUrl': image_url}), 201
        except Exception as e:
            logging.error(f"Error uploading file: {e}")
            return jsonify({'error': str(e)}), 500
    logging.error("File not allowed")
    return jsonify({'error': 'File not allowed'}), 400
