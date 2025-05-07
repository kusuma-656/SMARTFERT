from flask import Flask, request, jsonify
import joblib
import numpy as np
import os
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
from auth import init_auth

# Initialize Flask app
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'c33feae675800516319f70cb5c693b8d' 
init_auth(app)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# ✅ Correct Crop and Soil Types
CROP_TYPES = [
    'Wheat', 'Ragi', 'Maize', 'Rice', 'Sugarcane', 'Barley', 'Millet', 'Sorghum',
    'Oats', 'Corn', 'Soybean', 'Lentil', 'Chickpea', 'Pea', 'Groundnut', 'Mustard',
    'Cotton', 'Sunflower', 'Sesame', 'Flax', 'Tobacco', 'Tea', 'Coffee', 'Banana',
    'Mango', 'Guava', 'Papaya', 'Pineapple', 'Orange', 'Lemon', 'Apple', 'Grapes',
    'Pomegranate', 'Coconut', 'Arecanut', 'Cashew', 'Tomato', 'Potato', 'Onion',
    'Garlic', 'Carrot', 'Spinach', 'Cabbage', 'Cauliflower', 'Brinjal', 'Cucumber',
    'Pumpkin', 'Beans', 'Okra', 'Bitter Gourd'
]

SOIL_TYPES = [
    'Clayey', 'Loamy', 'Sandy', 'Silty', 'Peaty', 'Saline', 'Laterite',
    'Black', 'Red', 'Alluvial', 'Chalky', 'Gravelly'
]


# ✅ Re-train Encoders
crop_encoder = LabelEncoder()
crop_encoder.fit(CROP_TYPES)
joblib.dump(crop_encoder, '../models/crop_encoder.pkl')

soil_encoder = LabelEncoder()
soil_encoder.fit(SOIL_TYPES)
joblib.dump(soil_encoder, '../models/soil_encoder.pkl')

# ✅ Load Models and Encoders
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
rf_model = joblib.load(os.path.join(BASE_DIR, '../models/system1_rf_model.pkl'))
encoder_crop = joblib.load(os.path.join(BASE_DIR, '../models/crop_encoder.pkl'))
encoder_soil = joblib.load(os.path.join(BASE_DIR, '../models/soil_encoder.pkl'))
# ✅ Load Environmental Impact Prediction Model
# ✅ Correct (matches available file)
regressor = joblib.load(os.path.join(BASE_DIR, '../models/system2_model.pkl'))



# ✅ Print Available Types
print(f"✅ Available Crop Types: {encoder_crop.classes_}")
print(f"✅ Available Soil Types: {encoder_soil.classes_}")

# ✅ Safe Transform Function
def safe_transform(encoder, value, encoder_name):
    try:
        return encoder.transform([value])[0]
    except ValueError:
        print(f"⚠️ Warning: Unseen label '{value}' encountered in {encoder_name}!")
        return -1

# ✅ Fertilizer Prediction Endpoint
@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.get_json()
        
        # ✅ Validate input keys
        required_keys = ['crop_type', 'nitrogen', 'phosphorus', 'potassium', 'soil_ph', 'soil_type']
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({'error': f'Missing keys: {missing_keys}'}), 400
        
        # ✅ Convert and validate data
        crop_type = safe_transform(encoder_crop, data['crop_type'], "Crop Encoder")
        soil_type = safe_transform(encoder_soil, data['soil_type'], "Soil Encoder")
        nitrogen = float(data.get('nitrogen', 0))
        phosphorus = float(data.get('phosphorus', 0))
        potassium = float(data.get('potassium', 0))
        soil_ph = float(data.get('soil_ph', 0))

        # ✅ Handle unseen labels
        if crop_type == -1 or soil_type == -1:
            return jsonify({'error': f"Invalid crop type: '{data['crop_type']}' or soil type: '{data['soil_type']}'"}), 400
        
        # ✅ Create input data for model
        input_data = np.array([[crop_type, nitrogen, phosphorus, potassium, soil_ph, soil_type]])
        print(f"✅ Input Data for Fertilizer Prediction: {input_data}")

        # ✅ Predict fertilizer
        prediction = rf_model.predict(input_data)[0]
        print(f"✅ Predicted Fertilizer: {prediction}")

        return jsonify({'predicted_fertilizer': prediction})
    
    except Exception as e:
        print(f"❌ Prediction Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ✅ Environmental Impact Prediction Endpoint
@app.route('/predict_impact', methods=['POST'])
def predict_impact():
    try:
        data = request.get_json()
        
        # ✅ Validate input keys
        required_keys = ['crop_type', 'nitrogen', 'phosphorus', 'potassium']
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            return jsonify({'error': f'Missing keys: {missing_keys}'}), 400
        
        # ✅ Convert and validate data
        crop_type = safe_transform(encoder_crop, data['crop_type'], "Crop Encoder")
        nitrogen = float(data.get('nitrogen', 0))
        phosphorus = float(data.get('phosphorus', 0))
        potassium = float(data.get('potassium', 0))

        # ✅ Handle unseen labels
        if crop_type == -1:
            return jsonify({'error': f"Invalid crop type: '{data['crop_type']}'"}), 400
        
        # ✅ Create input data for model
        input_data = np.array([[crop_type, nitrogen, phosphorus, potassium]])
        print(f"✅ Input Data for Impact Prediction: {input_data}")

        # ✅ Predict impact
        prediction = regressor.predict(input_data)[0]
        print(f"✅ Predicted Impact: {prediction}")

        return jsonify({
            'carbon_emissions_kg': prediction[0],
            'water_pollution_risk': prediction[1],
            'soil_degradation_index': prediction[2]
        })
    
    except Exception as e:
        print(f"❌ Impact Prediction Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# ✅ Test Endpoint
@app.route('/')
def home():
    return "Fertilizer Recommender API is Running!"

# ✅ Start Flask Server
if __name__ == '__main__':
    app.run(debug=True)