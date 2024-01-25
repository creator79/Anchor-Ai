// App.js
import  { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AccountCreated from './components/AccountCreated';
import Otp from './components/Otp';
import DashBoard from './components/Dashboard';
import { ReactNode } from 'react';


interface ProtectedRouteProps {
  element: ReactNode;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
    // rest of your code...
    return isLoggedIn ? element : <Navigate to="/" />;
  };

  if (!isLoggedIn) {
  <Navigate to='/login' />
  }

  return (
    <div className="bg-black flex flex-col pl-11 pr-20 pt-5 pb-12 max-md:px-5 min-h-screen">
      
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/accountcreated" element={<AccountCreated />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<DashBoard />} />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
