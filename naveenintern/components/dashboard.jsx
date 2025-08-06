import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.jpg";
import FileUpload from "../components/FileUpload";
import FileQuery from "../components/FileQuery";
import FileAnswer from "../components/FileAnswer";


const DashBoard = () => {
  const navigate = useNavigate();

  // Check login status using "jwtToken"
  const isLoggedIn = Boolean(localStorage.getItem("jwtToken"));

    // Shared state for emotion flow
  const [fileAnalysisResult, setFileAnalysisResult] = useState(null); // from /analyze or /analyze-image
  const [queryText, setQueryText] = useState(""); // from user text input
  const [aiResponse, setAiResponse] = useState(null); // from AI API

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
  return (
    <div className="d-flex flex-column w-100" style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#B5CFFF" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Intern Pro Logo"
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
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/pricing">
                  Price
                </Link>
              </li>
              {/* Conditionally render Dashboard */}
              {/* {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )} */}

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

      {/* Main Content */}
      <div style={{ backgroundColor: "#f6f9ff", flex: "1", padding: "20px" }}>
        {/* Error Boundaries for Components */}
        <ErrorBoundary>
          <FileAnswer aiResponse={aiResponse} />
        </ErrorBoundary>
        <ErrorBoundary>
          <FileUpload setFileAnalysisResult={setFileAnalysisResult} />
        </ErrorBoundary>
        <ErrorBoundary>
          <FileQuery 
            queryText={queryText}
            setQueryText={setQueryText}
            fileAnalysisResult={fileAnalysisResult}
            setAiResponse={setAiResponse} />
        </ErrorBoundary>
      </div>
    </div>
  );
};

// ErrorBoundary Component for Safety
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return this.props.children;
  }
}

export default DashBoard;
