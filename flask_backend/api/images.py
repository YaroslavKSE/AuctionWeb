import os
import boto3
import logging
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
from PIL import Image
import pillow_heif
import io

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


def process_image(file):
    # Read the file content
    file_content = file.read()
    file.seek(0)  # Reset file pointer

    # Check if it's an HEIC file
    if file.filename.lower().endswith(('.heic', '.heif')):
        heif_file = pillow_heif.read_heif(file_content)
        image = Image.frombytes(
            heif_file.mode,
            heif_file.size,
            heif_file.data,
            "raw",
            heif_file.mode,
            heif_file.stride,
        )
    else:
        image = Image.open(io.BytesIO(file_content))

    # Resize the image if it's too large
    max_size = (1920, 1080)
    image.thumbnail(max_size, Image.LANCZOS if hasattr(Image, 'LANCZOS') else Image.ANTIALIAS)

    # Compress the image
    output_io = io.BytesIO()
    image.save(output_io, format='JPEG', quality=85, optimize=True)
    output_io.seek(0)

    return output_io, 'image/jpeg'


@images.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        try:
            processed_file, content_type = process_image(file)
            filename = secure_filename(file.filename)
            filename = f"{filename.rsplit('.', 1)[0]}.jpg"

            s3_client.upload_fileobj(
                processed_file,
                DO_SPACE_BUCKET,
                filename,
                ExtraArgs={
                    'ACL': 'public-read',
                    'ContentType': content_type
                }
            )
            image_url = f'{DO_SPACE_ENDPOINT}/{DO_SPACE_BUCKET}/{filename}'
            return jsonify({'imageUrl': image_url}), 201
        except Exception as e:
            logging.error(f"Error processing and uploading file: {e}")
            return jsonify({'error': str(e)}), 500
    return jsonify({'error': 'File not allowed'}), 400
