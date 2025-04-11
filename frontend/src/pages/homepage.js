import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { token } = useAuth();

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-success mb-4">Welcome to AgriSmart 🌱</h1>
      <p className="lead mb-4">
        Smart farming solutions for efficient crop management and fertilizer recommendation.
      </p>

      <div className="d-flex justify-content-center gap-3">
        {token ? (
          <>
            <Link to="/dashboard" className="btn btn-success btn-lg">
              Go to Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline-success btn-lg">
              Login
            </Link>
            <Link to="/register" className="btn btn-success btn-lg">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
