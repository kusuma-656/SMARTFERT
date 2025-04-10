import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import FertilizerPrediction from "./components/FertilizerPrediction";
import ImpactPrediction from "./components/ImpactPrediction";
import Register from "./components/register";
import Login from "./components/login";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./context/AuthContext"; // 👈 import auth context

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { token, logout } = useAuth();

  return (
    <Router>
      <div className="container mt-4">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">🌱 AgriSmart</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-outline-danger ms-2" onClick={logout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <h2 className="mb-4">Fertilizer Recommender System</h2>
                  <FertilizerPrediction />
                  <ImpactPrediction />
                </>
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
