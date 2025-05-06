import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";

const images = [image1, image2, image3, image4, image5];
const captions = [
  "Crop Recommendation",
  "Fertilizer Prediction",
  "Fertilizer Analysis",
  "Environmental Monitoring",
  "Soil Health Monitoring",
];

const descriptions = [
  "Get the best crops for your land based on soil.",
  "Predict the optimal fertilizer combination for high yield.",
  "Analyze fertilizers for effectiveness and suitability.",
  "Monitor environmental parameters like humidity, temperature.",
  "Track and enhance soil health for long-term productivity.",
];

const HomePage = () => {
  const { token } = useAuth();

  const customFadeStyle = {
    transition: "opacity 1s ease-in-out",
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="fw-bold text-success mb-4">Welcome to AgriSmart 🌱</h1>
      <p className="lead mb-4">
        Smart farming solutions for efficient crop management and fertilizer recommendation.
      </p>

      {/* Carousel */}
      <div
        id="agriCarousel"
        className="carousel slide carousel-fade mb-5"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#agriCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              style={customFadeStyle}
            >
              <img
                src={image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
                style={{ maxHeight: "400px", objectFit: "cover",borderRadius: "20px" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{captions[index]}</h5>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#agriCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#agriCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Responsive Cards */}
      <div className="row justify-content-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex justify-content-center"
          >
            <div
              className="card shadow-lg border-0 hover-shadow"
              style={{
                width: "100%",
                maxWidth: "350px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={image}
                className="card-img-top"
                alt={`Card ${index + 1}`}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title text-success fw-bold">{captions[index]}</h5>
                <p className="card-text">{descriptions[index]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
