import React, { useState } from "react";
import logo from "../img/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const URL = import.meta.env.VITE_LOGIN_VERIFY_API;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // New state for loading
  const navigate = useNavigate(); // For navigating after successful login
  const [showPassword, setShowPassword] = useState(false);

  const handleData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Email validation regex
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    setErrorMessage(""); // Clear previous error message

    // Validation logic before submitting the form
    if (!formData.email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!formData.password) {
      setErrorMessage("Please enter a password.");
      return;
    }

    setLoading(true); // Set loading to true when API call starts

    try {
      // Send the email and password to the API
      const response = await axios.post(URL, {
        email: formData.email,
        password: formData.password,
      });

      console.log("API Response:", response);

      // Assuming the API response includes a token or user data
      if (response.statusText === "OK") {
        // Handle successful login (e.g., store token, redirect, etc.)
        const jwt = response.data.token;
        console.log("token:", jwt);
        localStorage.setItem("jwtToken", jwt);
        window.dispatchEvent(new Event("tokenUpdated"));
        navigate("/dashboard"); // Change to your dashboard or home page
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error); // Logs the error
      setErrorMessage("An error occurred. Please try again.");

      if (error.response) {
        const { status } = error.response;

        // Log the error status
        console.log("Error Status:", status);

        switch (status) {
          case 404:
            console.log("Not a valid email");
            setErrorMessage("Please provide a valid email");
            break;
          case 401:
            console.log("Invalid password");
            setErrorMessage("Invalid password");
            break;
          case 403:
            console.log("Plan expired");
            setErrorMessage("Please upgrade, plan expired");
            break;
          default:
            console.log("Something went wrong!");
            setErrorMessage("An unexpected error occurred.");
            break;
        }
      } else {
        console.log("Network error or no response received");
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false); // Set loading to false after API call finishes
    }
  };

  return (
    <div style={{ backgroundColor: "#f6f9ff", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container mb-3">
        <div className="container mb-2 d-flex justify-content-center">
          <img src={logo} alt="logo" height="30px" width="30px" className="me-2" />
          <h4 style={{ color: "#012970", fontSize: "20px" }}>Intern Pro</h4>
        </div>
        <div className="container" style={{ width: "400px" }}>
          <div className="card">
            <div className="card-body shadow bg-body-tertiary-subtle">
              <h5 style={{ color: "#012970", textAlign: "center" }}>Login to Your Account</h5>
              <p className="text-center">Enter your email & password to login</p>

              {/* Display error message if any */}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail"
                  value={formData.email}
                  onChange={handleData}
                  required
                  aria-label="Email address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    className="form-control"
                    id="inputPassword"
                    onChange={handleData}
                    aria-label="Password"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="btn btn-outline-primary w-100 mt-3 mb-2"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Logging In..." : "Login"}
              </button>

              <p className="text-center">Don't have an account?</p>
              <div className="pt-1 bg-light bg-opacity-25 border border-light-subtle rounded shadow bg-body-tertiary text-center">
                <p>
                  <Link
                    to="/register" // Navigate to the register page
                    className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                  >
                    Create an account
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

export default LoginPage;
