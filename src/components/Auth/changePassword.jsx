import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams(); // Retrieve username from URL parameters

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/updatePassword/${username}`, { newPassword });
      // Assuming the API returns success upon successful password update
      if (response.status === 200) {
        toast.success("Password changed successfully. Please login with your new password.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.success("Failed to change password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="main">
        <div className="login-form row">
          <h4 className="text-center">Change Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-login-form">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i
                className={
                  showPassword
                    ? "fa-solid sow-hide fa-eye-slash"
                    : "fa-solid sow-hide fa-eye"
                }
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <span className="otp-msg">
              OTP will be sent to your registered email address.
            </span>
            <p className="mt-2">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
            <div className="login-button">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
