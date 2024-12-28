import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo.jpg";

const Home = () => {
    const navigate = useNavigate();

    // Check login status using "jwtToken"
    const isLoggedIn = Boolean(localStorage.getItem("jwtToken"));

    // Handle login and register button navigation
    const handleLoginBtn = () => {
        navigate("/LoginPage");
    };

    const handleRegisterBtn = () => {
        navigate("/register");
    };

    const handleDashBoardBtn = () =>{
        navigate("/dashboard");

    };

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
        <div className="d-flex flex-column position-fixed top-0 w-100">
            <nav
                className="navbar navbar-expand-lg"
                style={{ backgroundColor: "#B5CFFF" }}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img
                            src={logo}
                            alt="Logo"
                            width="30"
                            height="28"
                            className="d-inline-block align-text-top me-3"
                        />
                        <span
                            style={{ color: "#012970", fontSize: "20px" }}
                        >
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

            <div
                style={{
                    backgroundColor: "#f6f9ff",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="container text-center">
                    <div className="row">
                        <div className="col-12">
                            <p
                                className="title fs-1"
                                style={{ color: "#012970" }}
                            >
                                Your Friendly AI Assistant
                            </p>
                        </div>
                        <div className="col-12">
                            <p
                                className="subtitle fs-4"
                                style={{ color: "#012970" }}
                            >
                                Ask me anything, anytime.
                            </p>
                        </div>
                        <div className="col-12 mt-4">
                            {!isLoggedIn && (
                                <>
                                    <button
                                        type="button"
                                        className="btn me-4"
                                        style={{
                                            color: "#012970",
                                            backgroundColor: "#B5CFFF",
                                            border: "1px solid #012970",
                                            borderRadius: "25px",
                                            padding: "0.5rem 1rem",
                                        }}
                                        onClick={handleLoginBtn}
                                    >
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        style={{
                                            color: "#012970",
                                            backgroundColor: "#B5CFFF",
                                            border: "1px solid #012970",
                                            borderRadius: "25px",
                                            padding: "0.5rem 1rem",
                                        }}
                                        onClick={handleRegisterBtn}
                                    >
                                        Register Now
                                    </button>
                                </>
                            )}
                             {isLoggedIn && (
                                <>
                                 <button
                                        type="button"
                                        className="btn"
                                        style={{
                                            color: "#012970",
                                            backgroundColor: "#B5CFFF",
                                            border: "1px solid #012970",
                                            borderRadius: "25px",
                                            padding: "0.5rem 1rem",
                                        }}
                                        onClick={handleDashBoardBtn}
                                    >
                                        DashBoard
                                    </button>

                                </>
                              )}  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
