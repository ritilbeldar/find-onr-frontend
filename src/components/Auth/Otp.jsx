import React, { useContext, useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import { UserContext } from "../../utils/RegisterContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";

const Otp = () => {
  const { userData } = useContext(UserContext);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { username } = useParams(); // Get the username from URL params
  const [loading, setLoading] = useState(false);
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(`https://find-one-backend.onrender.com/verify_otp/${username}`, {
        otp: otp,
        username: username
      });
      const { success } = response.data;
      if (success) {
        toast.success("OTP Verified successfully!");
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <>
      <div className="main">
        <div className="login-form row">
          <h4 className="text-center">USER VERIFY</h4>
          <MuiOtpInput
            name="otp"
            value={otp}
            onChange={handleChange}
          />
          <div className="login-button">
            <button type="submit" disabled={loading} onClick={handleVerify}>
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "VERIFY"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
