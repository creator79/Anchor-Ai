import * as React from "react";
import "./App.css"; // Import your CSS file if needed
import { HomePage } from "./components/HomePage";
import { SignUp } from "./components/SignUp";
import { AccountCreated } from "./components/AccountCreated";
import { Otp } from "./components/Otp";
import { DashBoard } from "./components/Dashboard";
import {Login } from "./components/Login";
import LOGO from "./assets/Logo.png";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
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
              Welcome, Name
            </div>
          </div>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/accountcreated" element={<AccountCreated />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
       
        </Router>
      </div>
    </>
  );
}

export default App;


/*
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
*/