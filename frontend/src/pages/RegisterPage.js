import React from "react";
import Register from "../components/register";

const RegisterPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card p-4 shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3 text-success">Register</h3>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
