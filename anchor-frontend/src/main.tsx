import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Protected from "./components/Protected";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/HomePage";
import Error from "./components/Error";
import Otp from "./components/Otp";
import AccountCreated from "./components/AccountCreated";
import DashBoard from "./components/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Protected />}>
        <Route path="/" element={<Home />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/accountcreated" element={<AccountCreated />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<Error />} />r
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
