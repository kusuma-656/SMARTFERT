import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import FertilizerPrediction from "./components/FertilizerPrediction";
import ImpactPrediction from "./components/ImpactPrediction";
import Register from "./components/register";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./context/AuthContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ForgotPassword from "./components/ForgotPassword"; // ✅ Import this


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { token, logout } = useAuth();

  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm px-4">
          <div className="container-fluid">
            <Link
              className="navbar-brand fw-bold text-white fs-3"
              to="/"
              style={{ fontFamily: "Segoe UI", letterSpacing: "1px" }}
            >
              🌱 AgriSmart
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-light ms-2" onClick={logout}>
                        <i className="bi bi-box-arrow-right me-1"></i> Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/login">
                        <i className="bi bi-box-arrow-in-right me-1"></i> Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/register">
                        <i className="bi bi-person-plus me-1"></i> Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <div className="container mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <h2 className="mb-4 text-success fw-semibold">Fertilizer Recommender System</h2>
                    <FertilizerPrediction />
                    <ImpactPrediction />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
