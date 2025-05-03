import React from "react";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";  


const images = [image1, image2, image3,image4,image5];
const captions = ["Crop recommandation", "Fertilizer prediction", "fertilizer Analysis", "Environmental Monitoring", "Soil Health Monitoring"];

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
        className="carousel slide carousel-fade mb-4"
        data-bs-ride="carousel"
        data-bs-interval="700"
      >
        {/* Indicators */}
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

        {/* Slides */}
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
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{captions[index]}</h5>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
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

      
    </div>
  );
};

export default HomePage;
