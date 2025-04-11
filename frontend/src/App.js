import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/homepage";

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
            <Link className="navbar-brand fw-bold text-white fs-3" to="/dashboard">
              🌱 AgriSmart
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                {token ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
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
  <Route path="/" element={<HomePage />} /> {/* 👈 This is the new line for home */}
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
</Routes>

        </div>
      </div>
    </Router>
  );
};

export default App;
