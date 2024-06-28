import React, { useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/forgotPassword";
import PasswordOtp from "./components/Auth/PasswordOtp";
import ChangePassword from "./components/Auth/changePassword";
import Register from "./components/Auth/Register";
import Otp from "./components/Auth/Otp";
import Home from "./components/home/home";
import { UserContext } from "./utils/RegisterContext";



const App = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/paaword-otp/:username" element={<PasswordOtp />} />
        <Route path="/change-password/:username" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp/:username" element={<Otp />} />
      </Routes>
    </div>
  );
};

export default App;
