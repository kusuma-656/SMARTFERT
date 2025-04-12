import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false); // Close navbar after clicking a link
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white fs-3" to="/" onClick={closeNavbar}>
          🌱 AgriSmart
        </Link>

        <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard" onClick={closeNavbar}>
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light ms-2" onClick={() => { logout(); closeNavbar(); }}>
                    <i className="bi bi-box-arrow-right me-1"></i> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login" onClick={closeNavbar}>
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register" onClick={closeNavbar}>
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
