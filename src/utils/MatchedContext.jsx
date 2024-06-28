import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserContext } from "./RegisterContext";

export const MatchedContext = createContext(null);

const MatchedContextProvider = ({ children }) => {
  const { matchedUsers, fetchUserData } = useContext(UserContext);
  const [feeling, setFeeling] = useState("");

  useEffect(() => {
    if (feeling) {
      sendFeelingToBackend(feeling);
    }
  }, [feeling]);

  const sendFeelingToBackend = async (feeling, setFeeling) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:5000/user/feelingmatch",
        { feeling },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedUserData = response.data;
      setFeeling(updatedUserData.feeling);
      toast.success("Feeling shared successfully!");
    } catch (error) {
      console.error("Error sharing feeling:", error);
      toast.error("Failed to share feeling. Please try again.");
    }
  };

  const feelingShare = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:5000/user/feeling_Share/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("User matched successfully");
        fetchUserData(token);
      } else {
        console.error("Failed to match user");
      }
    } catch (error) {
      console.error("Error occurred while matching user:", error);
    }
  };

  return (
    <MatchedContext.Provider
      value={{
        setFeeling,
        matchedUsers,
        feeling,
        feelingShare,
        sendFeelingToBackend,
      }}
    >
      {children}
    </MatchedContext.Provider>
  );
};

export default MatchedContextProvider;
