import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Router,
} from "react-router-dom";
import Protected from "./components/Protected";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/HomePage";
import Error from "./components/Error";
import Otp from "./components/Otp";
import AccountCreated from "./components/AccountCreated";
import DashBoard from "./components/Dashboard";
import Header from "./components/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<Signup />} />
      <Route path="otp" element={<Otp />} />
      <Route path="accountcreated" element={<AccountCreated />} />
      <Route path="login" element={<Login />} />
      <Route path="header" element={<Header />} />
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Protected />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="*" element={<Error />} />r
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
