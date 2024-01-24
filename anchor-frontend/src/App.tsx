import React, { useState, useEffect } from "react";
import "./App.css";
import { HomePage } from "./components/HomePage";
import { SignUp } from "./components/SignUp";
import { AccountCreated } from "./components/AccountCreated";
import Otp from "./components/Otp";
import { DashBoard } from "./components/Dashboard";
import { Login } from "./components/Login";
import LOGO from "./assets/Logo.png";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    if (storedUsername && name === "") {
      setName(storedUsername);
    }
  }, [name]);

  const handleLogout = () => {
    // Clear session storage and reset name
    sessionStorage.removeItem("username");
    setName("");
  };





  return (
    <>
      <div className="bg-black flex flex-col pl-11 pr-20 pt-5 pb-12 max-md:px-5 min-h-screen">
        
        <div className="flex w-full max-w-[1195px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="flex items-stretch justify-between gap-5">
            <img
              loading="lazy"
              src={LOGO}
              className="aspect-[1.05] object-contain object-center w-[42px] overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-white text-xl font-bold my-auto">
              ANONYMOUS
            </div>
          </div>
          <div className="flex items-stretch justify-end gap-4 ">
            <div className="text-white ml-[12rem] text-xl font-bold my-auto">
              Welcome, {name}
            </div>
            <button className="text-white" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/accountcreated" element={<AccountCreated />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
