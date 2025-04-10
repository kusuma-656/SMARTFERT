import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const FertilizerPrediction = () => {
  const [formData, setFormData] = useState({
    crop_type: "Wheat",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    soil_ph: "",
    soil_type: "Clayey",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const cropOptions = ["Wheat", "Ragi", "Maize", "Rice", "Sugarcane"];
  const soilOptions = ["Clayey", "Loamy", "Sandy", "Silty"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_fertilizer",
        formData
      );
      setResult(response.data);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError("Failed to predict fertilizer");
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <div className="card-body">
          <h2 className="text-center text-dark mb-4">
            <i className="bi bi-flower1"></i> Fertilizer Prediction
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Crop Type</label>
              <select
                className="form-select rounded-3"
                name="crop_type"
                value={formData.crop_type}
                onChange={handleChange}
                required
              >
                {cropOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Nitrogen</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="nitrogen"
                  placeholder="Enter Nitrogen Level"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phosphorus</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="phosphorus"
                  placeholder="Enter Phosphorus Level"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Potassium</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="potassium"
                  placeholder="Enter Potassium Level"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Soil pH</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="soil_ph"
                  placeholder="Enter Soil pH"
                  value={formData.soil_ph}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Soil Type</label>
              <select
                className="form-select rounded-3"
                name="soil_type"
                value={formData.soil_type}
                onChange={handleChange}
                required
              >
                {soilOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold">
              <i className="bi bi-search"></i> Predict
            </button>
          </form>

          {/* Error Handling */}
          {error && (
            <div className="alert alert-danger mt-3">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Prediction Result */}
          {result && (
            <div className="alert alert-success mt-3 text-center">
              <h4 className="mb-3"><i className="bi bi-flower3"></i> Predicted Fertilizer</h4>
              <p className="fw-bold">{result.predicted_fertilizer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerPrediction;
