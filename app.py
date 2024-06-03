from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)


@app.route('/')
def home():
    return "Hello, MongoDB!"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
