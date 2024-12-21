import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import FileUpload from "../components/FileUpload";
import FileQuery from "../components/FileQuery";
import FileAnswer from "../components/FileAnswer";

const DashBoard = () => {
  return (
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
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
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
      <div style={{ backgroundColor: "#f6f9ff", minHeight: "100vh" }}>
      <FileAnswer />
      <FileUpload />
      <FileQuery />
      </div>
    
    </div>
  );
};

export default DashBoard;
