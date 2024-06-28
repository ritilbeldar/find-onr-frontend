import React, { useState, useContext } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../utils/RegisterContext";

const ForgotPassword = () => {
  const { userForgotPassword } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userForgotPassword({ username });
      navigate(`/password-otp/${username}`);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main">
        <div className="login-form row">
          <h4 className="text-center">Forgot Password</h4>
          <form onSubmit={handleSubmit}>
            <div className="input-login-form">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <span className="otp-msg">OTP will be sent to your registered email address.</span>
            <p className="mt-2">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
            <div className="login-button">
              <button type="submit" disabled={loading}>
                {loading ? (
                  <i className="fa fa-spinner fa-spin"></i>
                ) : (
                  "Send"
                )}
              </button>
            </div>
          </form>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
