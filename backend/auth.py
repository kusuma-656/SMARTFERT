# auth.py
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS
from db import mongo, init_db
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

def init_auth(app):
    app.config["MONGO_URI"] = "mongodb+srv://kulal:kulal@cluster0.vimzzk0.mongodb.net/fertilizerRecommender?retryWrites=true&w=majority&appName=Cluster0"
    
    CORS(app)
    bcrypt.init_app(app)
    init_db(app)
    JWTManager(app)
    app.register_blueprint(auth_bp, url_prefix='/auth')



@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    users = mongo.db.users
    if users.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = {
        'username': data['username'],
        'email': data['email'],
        'password': hashed_pw
    }
    users.insert_one(user)
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = mongo.db.users.find_one({'email': data['email']})
    if not user or not bcrypt.check_password_hash(user['password'], data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user['email'], expires_delta=timedelta(days=1))
    return jsonify({'token': access_token, 'message': 'Login successful'})
