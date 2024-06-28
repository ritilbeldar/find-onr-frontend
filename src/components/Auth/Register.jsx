import React, { useContext, useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { UserContext } from "../../utils/RegisterContext";

const Register = () => {
  const { saveUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      username: e.target.username.value,
      email: e.target.email.value,
      gender: e.target.gender.value,
      password: e.target.password.value,
    };
    try {
      await saveUserData(formData);
      navigate(`/otp/${formData.username}`);
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main">
        <form onSubmit={handleSubmit} className="login-form row">
          <h4 className="text-center">Register</h4>
          <div className="input-login-form">
            <i className="fa-solid fa-user"></i>
            <input type="text" name="username" placeholder="Username" required />
          </div>
          <div className="input-login-form">
            <i className="fa-solid fa-envelope"></i>
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div className="login-gender">
            <div>
              <i className="fa-solid fa-venus-mars"></i>
              <h6>Gender</h6>
            </div>
            <div className="login-gender-bottom">
              <span>
                <input type="radio" name="gender" value="male" id="male" required />
                <label htmlFor="male">Male</label>
              </span>
              <span>
                <input type="radio" name="gender" value="female" id="female" required />
                <label htmlFor="female">Female</label>
              </span>
            </div>
          </div>

          <div className="input-login-form">
            <i className="fa-solid fa-lock"></i>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
          <div className="login-button">
            <button type="submit" disabled={loading}>
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
        <Outlet />
      </div>
    </>
  );
};

export default Register;
