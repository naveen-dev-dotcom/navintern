import React from "react";
import {useNavigate } from "react-router-dom";

const Unauth = () => {

  const navigate = useNavigate();
  
  const handleLoginBtn = () => {
    navigate("/LoginPage");
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f6f9ff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h4 style={{ color: "#012970" }}>
          You're not authorized to access this page. Please login first.
        </h4>
        <p>
        <div className="col-12 mt-4">
                            <button
                                type="button"
                                className="btn me-4 rounded-pill border border-primary"
                                style={{ color: '#012970', backgroundColor: '#B5CFFF' }}
                                onClick={handleLoginBtn}
                            >
                                Login
                            </button>
                            
                        </div>
        </p>
      </div>
    </div>
  );
};

export default Unauth;
