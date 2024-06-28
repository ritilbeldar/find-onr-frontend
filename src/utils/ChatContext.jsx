import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { UserContext } from "./RegisterContext";

export const ChatContext = createContext(null);

const ChatContextProvider = ({ children }) => {
  const { setUserData, userData,fetchUserData } = useContext(UserContext);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const addInChat = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `http://localhost:5000/user/add_in_chat/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        handleShow();
        fetchUserData(token);
        toast.success("User added to chat successfully.");
      } else {
        toast.error("Failed to add user to chat.");
      }
    } catch (error) {
      console.error("Error occurred while adding user to chat:", error);
      toast.error("Error occurred while adding user to chat.");
    }
  };

  return (
    <ChatContext.Provider
      value={{
        addInChat,
        userData,
        handleShow,
        show,
        setShow,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
