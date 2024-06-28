import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/RegisterContext";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(username, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="main">
        <div className="login-form row">
          <h4 className="text-center">SIGN IN</h4>
          <form onSubmit={handleLogin}>
            <div className="input-login-form">
              <i className="fa-solid fa-user"></i>
              <input type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-login-form">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
             <i
                className={showPassword ? "fa-solid sow-hide fa-eye-slash" : "fa-solid sow-hide fa-eye"}
                onClick={togglePasswordVisibility}
              ></i> 
            </div>
            <p className="text-end mt-2">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <p className="mt-2">
              Don't have an account? <Link to="/register">Register Here</Link>
            </p>
            <div className="login-button">
              <button type="submit">LOGIN</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
