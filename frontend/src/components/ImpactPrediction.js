// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ImpactPrediction = () => {
//   const [formData, setFormData] = useState({
//     crop_type: "",
//     nitrogen: "",
//     phosphorus: "",
//     potassium: "",
//   });

//   const [result, setResult] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/predict_impact",
//         formData
//       );
//       setResult(response.data);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to predict environmental impact");
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
//       <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", backgroundColor: "#ffffff" }}>
//         <div className="card-body">
//           <h2 className="text-center text-dark mb-4">
//             <i className="bi bi-bar-chart-line"></i> Environmental Impact Prediction
//           </h2>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label fw-semibold">Crop Type</label>
//               <input
//                 type="text"
//                 className="form-control rounded-3"
//                 name="crop_type"
//                 placeholder="Enter Crop Type"
//                 value={formData.crop_type}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="row">
//               <div className="col-md-4 mb-3">
//                 <label className="form-label fw-semibold">Nitrogen</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="nitrogen"
//                   placeholder="N Level"
//                   value={formData.nitrogen}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className="form-label fw-semibold">Phosphorus</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="phosphorus"
//                   placeholder="P Level"
//                   value={formData.phosphorus}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="col-md-4 mb-3">
//                 <label className="form-label fw-semibold">Potassium</label>
//                 <input
//                   type="number"
//                   className="form-control rounded-3"
//                   name="potassium"
//                   placeholder="K Level"
//                   value={formData.potassium}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold">
//               <i className="bi bi-bar-chart-fill"></i> Predict
//             </button>
//           </form>

//           {/* Display Result */}
//           {result && (
//             <div className="alert alert-info mt-4 text-center">
//               <h4 className="mb-3"><i className="bi bi-graph-up-arrow"></i> Prediction Result</h4>
//               <p><strong>🌱 Carbon Emissions (kg):</strong> {result.carbon_emissions_kg}</p>
//               <p><strong>💧 Water Pollution Risk:</strong> {result.water_pollution_risk}</p>
//               <p><strong>🌍 Soil Degradation Index:</strong> {result.soil_degradation_index}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImpactPrediction;





// ================= ImpactPrediction =================

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ImpactPrediction = () => {
  const [formData, setFormData] = useState({
    crop_type: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchStoredData = () => {
      const storedData = localStorage.getItem("fertilizer_data");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...parsedData,
        }));
      }
    };
  
    // Initial load
    fetchStoredData();
  
    // Listen for update event
    window.addEventListener("fertilizerDataUpdated", fetchStoredData);
  
    // Clean up
    return () => {
      window.removeEventListener("fertilizerDataUpdated", fetchStoredData);
    };
  }, []);
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict_impact",
        formData
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to predict environmental impact");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card shadow-lg p-4 border-0" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px", backgroundColor: "#ffffff" }}>
        <div className="card-body">
          <h2 className="text-center text-dark mb-4">
            <i className="bi bi-bar-chart-line"></i> Environmental Impact Prediction
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Crop Type</label>
              <input
                type="text"
                className="form-control rounded-3"
                name="crop_type"
                placeholder="Enter Crop Type"
                value={formData.crop_type}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Nitrogen</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="nitrogen"
                  placeholder="N Level"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Phosphorus</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="phosphorus"
                  placeholder="P Level"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold">Potassium</label>
                <input
                  type="number"
                  className="form-control rounded-3"
                  name="potassium"
                  placeholder="K Level"
                  value={formData.potassium}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-3 fw-bold">
              <i className="bi bi-bar-chart-fill"></i> Predict
            </button>
          </form>

          {result && (
            <div className="alert alert-info mt-4 text-center">
              <h4 className="mb-3"><i className="bi bi-graph-up-arrow"></i> Prediction Result</h4>
              <p><strong>🌱 Carbon Emissions (kg):</strong> {result.carbon_emissions_kg}</p>
              <p><strong>💧 Water Pollution Risk:</strong> {result.water_pollution_risk}</p>
              <p><strong>🌍 Soil Degradation Index:</strong> {result.soil_degradation_index}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactPrediction;
