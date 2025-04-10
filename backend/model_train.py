import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import joblib

# Load system 1 data (fertilizer prediction)
system1_data = pd.read_csv('../data/system1.csv')

# Encode categorical data for system 1
encoder_system1 = LabelEncoder()
system1_data['Crop Type'] = encoder_system1.fit_transform(system1_data['Crop Type'])
system1_data['Soil Type'] = encoder_system1.fit_transform(system1_data['Soil Type'])

# Features and target for system 1
X_system1 = system1_data[['Crop Type', 'Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Soil pH', 'Soil Type']]
y_system1 = system1_data['Target Fertilizer']

# Train RandomForestClassifier for fertilizer prediction
rf_model = RandomForestClassifier()
rf_model.fit(X_system1, y_system1)

# Save system 1 model and encoder
joblib.dump(rf_model, '../models/system1_rf_model.pkl')
joblib.dump(encoder_system1, '../models/system1_encoder.pkl')

print("System 1 model and encoder saved.")

# Load system 2 data (environmental impact)
system2_data = pd.read_csv('../data/system2.csv')

# Encode categorical data for system 2
encoder_system2 = LabelEncoder()
system2_data['Crop Type'] = encoder_system2.fit_transform(system2_data['Crop Type'])

# Features and target for system 2
X_system2 = system2_data[['Crop Type', 'Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)']]
y_system2 = system2_data[['Carbon Emissions (kg)', 'Water Pollution Risk (%)', 'Soil Degradation (Index)']]

# Train LinearRegression for environmental impacts prediction
regressor = LinearRegression()
regressor.fit(X_system2, y_system2)

# Save system 2 model and encoder
joblib.dump(regressor, '../models/system2_model.pkl')
joblib.dump(encoder_system2, '../models/system2_encoder.pkl')

print("System 2 model and encoder saved.")
