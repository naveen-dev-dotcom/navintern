import React, { useContext, useEffect, useState } from "react";
import { UserRegContext } from "../src/contexts/UserRegContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../img/logo.jpg";

const Pricing = () => {
  const listStyle = {
    borderBottom: "1px solid #e0e0e0", // Style for all <li> elements
    padding: "8px 0",
  };

  const { saveUserPlanData, completeData } = useContext(UserRegContext);
  const URL = import.meta.env.VITE_REGISTRATION_VERIFY_API;
  const navigate = useNavigate();

  // Check login status using "jwtToken"
  const isLoggedIn = Boolean(localStorage.getItem("jwtToken"));

  // Handle logout
  const handleLogout = () => {
    try {
      localStorage.removeItem("jwtToken"); // Remove "jwtToken" from localStorage
      navigate("/LoginPage"); // Redirect to login page
      alert("You have been logged out successfully!"); // Feedback message
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (plan) => {
    console.log("handlePlanSelection called with:", plan);
    if (!plan) {
      alert("Please select a plan before proceeding.");
      return;
    }
    console.log("Selected Plan:", plan);
    setSelectedPlan(plan);
    saveUserPlanData(plan); // Save the selected plan
  };

  useEffect(() => {
    console.log("useEffect triggered with selectedPlan:", selectedPlan);
    if (selectedPlan) {
      const data = completeData();
      console.log("Full Data:", data);

      const submitData = async () => {
        try {
          console.log("Submitting data:", data);
          const response = await axios.post(URL, data);

          console.log("Response received:", response);
          if (response.status === 200) {
            // Success response
            console.log("Data submitted successfully:", response.data);
            alert("Successfully registered!");
            navigate("/LoginPage"); // Navigate only after successful submission
          } else {
            console.error("Unexpected response:", response);
            alert("Error: Unable to register. Please try again later.");
          }
        } catch (error) {
          console.error("Submission failed:", error);
          alert(
            "Error: Failed to submit data. Please check your network or try again."
          );
        }
      };

      submitData();
    }
  }, [selectedPlan, completeData, navigate]);

  return (
    <>
      <div className="d-flex flex-column position-fixed top-0 w-100">
        <nav
          className="navbar navbar-expand-lg"
          style={{ backgroundColor: "#B5CFFF" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="28"
                className="d-inline-block align-text-top me-3"
              />
              <span style={{ color: "#012970", fontSize: "20px" }}>
                Intern Pro
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse d-flex justify-content-end"
              id="navbar-text"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Price
                  </Link>
                </li>
                {/* Conditionally render Dashboard */}
                {isLoggedIn && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                {/* Conditionally render Register/Login or Logout */}
                {!isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/LoginPage">
                        Login
                      </Link>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <button
                      className="btn nav-link"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#012970",
                        cursor: "pointer",
                      }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <div style={{ backgroundColor: "#f6f9ff", minHeight: "100vh" }}>
          <div className="container py-5">
            <div className="text-center mb-4">
              <h4
                style={{
                  color: "#012970",
                  fontSize: "20px",
                  textDecoration: "underline",
                }}
              >
                Select Your Plan
              </h4>
              <p className="text-muted">
                "From active listening to strategic implementation, we redefine
                systems for enhanced efficiency, simplified processes, and
                informed decision-making."
              </p>
            </div>

            <div className="row justify-content-center">
              {/* Free Trial Plan */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header text-left bg-primary text-white">
                    <h5>Free Trial</h5>
                  </div>
                  <div className="card-body text-left">
                    <p className="text-muted">
                      <span
                        style={{
                          color: "#012970",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Expires in
                      </span>{" "}
                      24 hours
                    </p>
                    <ul className="list-unstyled">
                      <li style={listStyle}>Max file size: 5 MB</li>
                      <li style={listStyle}>OCR support: YES</li>
                      <li style={listStyle}>Customer support: NO</li>
                      <li style={listStyle}>Total sessions: UNLIMITED</li>
                    </ul>
                    <button
                      onClick={() => handlePlanSelection("free")}
                      className="btn btn-outline-primary w-100 mt-3 mb-2"
                    >
                      Create Free Account
                    </button>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header text-left bg-primary text-white">
                    <h5>Pro</h5>
                  </div>
                  <div className="card-body text-left">
                    <p className="text-muted">
                      <span
                        style={{
                          color: "#012970",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Rs 999
                      </span>
                      /week
                    </p>
                    <ul className="list-unstyled">
                      <li style={listStyle}>Max file size: 5 MB</li>
                      <li style={listStyle}>OCR support: YES</li>
                      <li style={listStyle}>Customer support: YES (Email)</li>
                      <li style={listStyle}>Total sessions: UNLIMITED</li>
                    </ul>
                    <button
                      onClick={() => handlePlanSelection("silver")}
                      className="btn btn-outline-primary w-100 mt-3 mb-2"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>

              {/* Advanced Plan */}
              <div className="col-md-4">
                <div className="card shadow">
                  <div className="card-header text-left bg-primary text-white">
                    <h5>Advanced</h5>
                  </div>
                  <div className="card-body text-left">
                    <p className="text-muted">
                      <span
                        style={{
                          color: "#012970",
                          fontSize: "20px",
                          fontWeight: "500",
                        }}
                      >
                        Rs 3499
                      </span>
                      /mo
                    </p>
                    <ul className="list-unstyled">
                      <li style={listStyle}>Max file size: 5 MB</li>
                      <li style={listStyle}>OCR support: YES</li>
                      <li style={listStyle}>Customer support: YES (Email)</li>
                      <li style={listStyle}>Total sessions: UNLIMITED</li>
                    </ul>
                    <button
                      onClick={() => handlePlanSelection("gold")}
                      className="btn btn-outline-primary w-100 mt-3 mb-2"
                    >
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
