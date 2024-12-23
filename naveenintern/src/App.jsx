import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Registration from "../components/registration";
import Pricing from "../components/pricing";
import LoginPage from "../components/LoginPage";
import DashBoard from "../components/dashboard";
import Unauth from "../components/Unauth";
import Home from '../components/Home';
function App() {
  const [isAuth, setIsAuth] = useState(false);

  const getTokenAndCheck = () => {
    const jwt = localStorage.getItem("jwtToken");
    console.log(jwt);
    setIsAuth(jwt !== null);
  }
  useEffect(() => {
    
    getTokenAndCheck();
    window.addEventListener("tokenUpdated",getTokenAndCheck);
    return()=>{
      window.removeEventListener("tokenUpdated",getTokenAndCheck);
    };

  }, []);
  console.log('isAuth',isAuth);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/dashboard" element={isAuth ? <DashBoard /> : <Navigate to="/401" />} />
        <Route path="/401" element={<Unauth />} />
      </Routes>
    </>
  );
}

export default App;
