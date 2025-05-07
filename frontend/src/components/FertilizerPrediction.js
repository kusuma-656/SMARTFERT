import React, { useState, useEffect } from "react";
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

  //fetching data

  const handleGenerateSensorData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getSensorData");
      const data = response.data;
      setFormData((prev) => ({
        ...prev,
        nitrogen: data.nitrogen,
        phosphorus: data.phosphorus,
        potassium: data.potassium,
        soil_moisture: data.soil_moisture,
      }));
    } catch (err) {
      console.error("Failed to fetch sensor data", err);
    }
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

      // Save values to local storage for impact prediction
      // After storing data in localStorage
      localStorage.setItem(
        "fertilizer_data",
        JSON.stringify({
          crop_type: formData.crop_type,
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
        })
      );

      // Notify other components
      window.dispatchEvent(new Event("fertilizerDataUpdated"));

      // Console log stored values
      const storedData = JSON.parse(localStorage.getItem("fertilizer_data"));
      console.log("Stored Fertilizer Data:");
      console.log("Crop Type:", storedData.crop_type);
      console.log("Nitrogen:", storedData.nitrogen);
      console.log("Phosphorus:", storedData.phosphorus);
      console.log("Potassium:", storedData.potassium);
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
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
        }}
      >
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
// Generate Sensor Data Button
            <button
              type="button"
              className="btn btn-secondary w-100 mb-3 rounded-3 fw-bold"
              onClick={handleGenerateSensorData}
            >
              <i className="bi bi-download"></i> Generate NPK & Humidity
            </button>

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
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Soil moitsure</label>
              <input
                type="number"
                className="form-control rounded-3"
                name="soil_moisture"
                placeholder="Enter soil moisture Level"
                value={formData.soil_moisture}
                onChange={handleChange}
                required
              />
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

            <button
              type="submit"
              className="btn btn-primary w-100 rounded-3 fw-bold"
            >
              <i className="bi bi-search"></i> Predict
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-3">
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div className="alert alert-success mt-3 text-center">
              <h4 className="mb-3">
                <i className="bi bi-flower3"></i> Predicted Fertilizer
              </h4>
              <p className="fw-bold">{result.predicted_fertilizer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FertilizerPrediction;









































// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const FertilizerPrediction = () => {
//   const [formData, setFormData] = useState({
//     crop_type: "Wheat",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//     soil_ph: "",
//     soil_type: "Clayey",
//     humidity: "",
//   });

//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);

//   const cropOptions = ["Wheat", "Ragi", "Maize", "Rice", "Sugarcane"];
//   const soilOptions = ["Clayey", "Loamy", "Sandy", "Silty"];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError(null);
//   };

//   const handleGenerateSensorData = async () => {
//     console.log("Fetching Sensor Data...");
//     try {
//       const response = await axios.get("http://localhost:4000/getSensorData");
//       const data = response.data;

//       // Only update if valid data is received
//       if (data.nitrogen && data.phosphorus && data.potassium && data.soil_moisture) {
//         setFormData((prev) => ({
//           ...prev,
//           nitrogen: data.nitrogen,
//           phosphorus: data.phosphorus,
//           potassium: data.potassium,
//           humidity: data.soil_moisture, // Assuming soil moisture is being treated as humidity here
//         }));
//         console.log("Sensor Data Updated: ", data);
//       } else {
//         console.error("Invalid sensor data received");
//       }
//     } catch (err) {
//       console.error("Failed to fetch sensor data", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/predict_fertilizer",
//         formData
//       );
//       setResult(response.data);
//       setError(null);

//       // Save values to local storage for impact prediction
//       localStorage.setItem(
//         "fertilizer_data",
//         JSON.stringify({
//           crop_type: formData.crop_type,
//           nitrogen: formData.nitrogen,
//           phosphorus: formData.phosphorus,
//           potassium: formData.potassium,
//         })
//       );

//       // Notify other components
//       window.dispatchEvent(new Event("fertilizerDataUpdated"));
//       console.log("Stored Fertilizer Data:", JSON.parse(localStorage.getItem("fertilizer_data")));
//     } catch (error) {
//       console.error("Error:", error);
//       setResult(null);
//       setError("Failed to predict fertilizer");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
//       <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", backgroundColor: "#ffffff" }}>
//         <div className="card-body">
//           <h2 className="text-center text-dark mb-4">
//             <i className="bi bi-flower1"></i> Fertilizer Prediction
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Crop Type</label>
//               <select
//                 className="form-select rounded-3"
//                 name="crop_type"
//                 value={formData.crop_type}
//                 onChange={handleChange}
//                 required
//               >
//                 {cropOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Generate Sensor Data Button */}
//             <button
//               type="button"
//               className="btn btn-secondary w-100 mb-3 rounded-3 fw-bold"
//               onClick={handleGenerateSensorData}
//             >
//               <i className="bi bi-download"></i> Generate NPK & Humidity
//             </button>

//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-semibold">Nitrogen</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="nitrogen"
//                   placeholder="Enter Nitrogen Level"
//                   value={formData.nitrogen}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-semibold">Phosphorus</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="phosphorus"
//                   placeholder="Enter Phosphorus Level"
//                   value={formData.phosphorus}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="row">
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-semibold">Potassium</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="potassium"
//                   placeholder="Enter Potassium Level"
//                   value={formData.potassium}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-6 mb-3">
//                 <label className="form-label fw-semibold">Soil pH</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="soil_ph"
//                   placeholder="Enter Soil pH"
//                   value={formData.soil_ph}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="col-md-6 mb-3">
//               <label className="form-label fw-semibold">Humidity</label>
//               <input
//                 type="number"
//                 className="form-control rounded-3"
//                 name="humidity"
//                 placeholder="Enter Humidity Level"
//                 value={formData.humidity}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label fw-semibold">Soil Type</label>
//               <select
//                 className="form-select rounded-3"
//                 name="soil_type"
//                 value={formData.soil_type}
//                 onChange={handleChange}
//                 required
//               >
//                 {soilOptions.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold">
//               <i className="bi bi-search"></i> Predict
//             </button>
//           </form>

//           {/* Result and Error Messages */}
//           {result && (
//             <div className="mt-4 alert alert-success">
//               <strong>Fertilizer Recommendation:</strong> {result.recommendation}
//             </div>
//           )}
//           {error && <div className="mt-4 alert alert-danger">{error}</div>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FertilizerPrediction;
