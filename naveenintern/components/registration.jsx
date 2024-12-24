import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserRegContext } from "../src/contexts/UserRegContext";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const { saveUserRegData } = useContext(UserRegContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const showData = async () => {
    setErrorMessage(""); // Clear any previous error messages

    // Validate fields
    if (!formData.name) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!formData.email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (!formData.password) {
      setErrorMessage("Please enter a password.");
      return;
    }

    // Password strength validation (min 8 characters, 1 uppercase, 1 number)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter and one number.");
      return;
    }

    if (!formData.agreeToTerms) {
      setErrorMessage("Please accept the terms and conditions.");
      return;
    }

    console.log("form Data", formData);
    saveUserRegData(formData);

    // Navigate only if form is valid
    navigate("/pricing");
  };

  return (
    <div style={{ backgroundColor: "#f6f9ff", minHeight: "100vh" }}>
      <div className="container mb-3">
        <div className="container mb-2 d-flex justify-content-center">
          <img
            src={logo}
            alt="logo"
            height="30px"
            width="30px"
            className="me-2"
          />
          <h4 style={{ color: "#012970", fontSize: "20px" }}>Intern Pro</h4>
        </div>
        <div className="container" style={{ width: "400px" }}>
          <div className="card">
            <div className="card-body shadow bg-body-tertiary-subtle">
              <h5 style={{ color: "#012970", textAlign: "center" }}>
                Create your Account
              </h5>
              <p className="text-center">Enter your details</p>

              {/* Display error messages */}
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="inputName" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="inputName"
                  onChange={handleData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail"
                  onChange={handleData}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="form-control"
                    id="inputPassword"
                    onChange={handleData}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                  name="agreeToTerms"
                  onChange={handleData}
                />
                <label className="form-check-label" htmlFor="gridCheck1">
                  I agree and accept the{" "}
                  <span className="text-primary">terms and conditions</span>
                </label>
              </div>

              <button
                type="button"
                onClick={showData}
                className="btn btn-outline-primary w-100 mt-3 mb-2"
              >
                Create Account
              </button>

              <p className="text-center">Already have an account?</p>
              <div className="pt-1 bg-light bg-opacity-25 border border-light-subtle rounded shadow bg-body-tertiary text-center">
                <p>
                  <Link
                    to="/LoginPage"
                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
