# auth.py
from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS
from db import mongo, init_db
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from db import mongo



auth_bp = Blueprint("auth", __name__)



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



# New route to save fertilizer data
@auth_bp.route("/storeFertilizerResult", methods=["POST"])
@jwt_required()
def store_fertilizer_result():
    data = request.get_json()
    print("📥 Received Fertilizer Data:", data)
    print("🌱 Predicted Fertilizer:", data.get("predicted_fertilizer"))

    current_user = get_jwt_identity()

    result_entry = {
        "user": current_user,
        "crop_type": data.get("crop_type"),
        "nitrogen": data.get("nitrogen"),
        "phosphorus": data.get("phosphorus"),
        "potassium": data.get("potassium"),
        "soil_ph": data.get("soil_ph"),
        "soil_type": data.get("soil_type"),
        "soil_moisture": data.get("soil_moisture"),
        "predicted_fertilizer": data.get("predicted_fertilizer"),
        "timestamp": datetime.utcnow()
    }

    mongo.db.fertilizer_predictions.insert_one(result_entry)

    return jsonify({"message": "Fertilizer prediction saved successfully."}), 200




# Route to store impact prediction results
@auth_bp.route("/storeImpactResult", methods=["POST"])
@jwt_required()
def store_impact_result():
    data = request.get_json()
    current_user = get_jwt_identity()  # This gives you the email/user ID from the token

    print("✅ Incoming Impact Prediction Data:", data)

    result_entry = {
        "user": current_user,
        "crop_type": data.get("crop_type"),
        "nitrogen": data.get("nitrogen"),
        "phosphorus": data.get("phosphorus"),
        "potassium": data.get("potassium"),
        "carbon_emissions_kg": data.get("carbon_emissions_kg"),
        "water_pollution_risk": data.get("water_pollution_risk"),
        "soil_degradation_index": data.get("soil_degradation_index"),
        "timestamp": datetime.utcnow()
    }

    mongo.db.impact_predictions.insert_one(result_entry)

    return jsonify({"message": "Impact prediction saved successfully."}), 200



