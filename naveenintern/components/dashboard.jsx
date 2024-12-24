import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import FileUpload from "../components/FileUpload";
import FileQuery from "../components/FileQuery";
import FileAnswer from "../components/FileAnswer";

const DashBoard = () => {
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
            <span style={{ color: "#012970", fontSize: "20px" }}>Intern Pro</span>
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
              <li className="nav-item">
                <Link className="nav-link active" to="/dashboard">
                  Dashboard
                </Link>
              </li>
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
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ backgroundColor: "#f6f9ff", flex: "1", padding: "20px" }}>
        {/* Error Boundaries for Components */}
        <ErrorBoundary>
          <FileAnswer />
        </ErrorBoundary>
        <ErrorBoundary>
          <FileUpload />
        </ErrorBoundary>
        <ErrorBoundary>
          <FileQuery />
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
