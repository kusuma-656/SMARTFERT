import React from "react";
import FertilizerPrediction from "../components/FertilizerPrediction";
import ImpactPrediction from "../components/ImpactPrediction";

const Dashboard = () => {
  return (
    <>
      <h2 className="mb-4 text-success fw-semibold">Fertilizer Recommender System</h2>
      <div className="mb-3">
        <FertilizerPrediction />
      </div>
      <div>
        <ImpactPrediction />
      </div>
    </>
  );
};

export default Dashboard;
