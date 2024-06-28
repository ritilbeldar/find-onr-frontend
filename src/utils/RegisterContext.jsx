import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { AvatarGenerator } from "random-avatar-generator";
export const UserContext = createContext(null);

const RegisterContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [postData, setPostData] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [userMatched, setUserMatched] = useState([]);
  const [forogtPassword, setforogtPassword] = useState({});

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/user", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setUserData(userData);
      setIsLoggedIn(true);
    } catch (error) {
      toast.error("Failed to fetch user data. Please try again.");
      logoutUser();
    }
  };

  const saveUserData = async (data) => {
    try {
      // Assuming AvatarGenerator is a class
      const generator = new AvatarGenerator();
      const avatar = generator.generateRandomAvatar();

      const userDataWithAvatar = { ...data, avatar };
      const response = await axios.post(
        "http://localhost:5000/userregister",
        userDataWithAvatar
      );

      const savedUserData = response.data;
      setUserData(savedUserData);
      toast.success("User registered successfully!");
    } catch (error) {
      console.error("Error saving user data:", error);
      toast.error("Failed to save user data. Please try again.");
    }
  };

  const loginUser = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/usersignin", {
        username,
        password,
      });
      const { token, user } = response.data;
      Cookies.set("token", token, { expires: 30 });
      setUserData(user);
      setIsLoggedIn(true);
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Failed to log in. Please try again.");
    }
  };

  const userForgotPassword = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/forgotPassword",
        data
      );

      const savedUserData = response.data;
      setforogtPassword(savedUserData);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const createPost = async (feeling, caption, postImg) => {
    try {
      const token = Cookies.get("token");
      const formData = new FormData();
      formData.append("feeling", feeling);
      formData.append("caption", caption);
      formData.append("postImg", postImg);

      const response = await axios.post(
        "http://localhost:5000/user/post_create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const savedPostData = response.data;
      fetchPostData();
      toast.success("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    }
  };

  const fetchPostData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:5000/user/all_post", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const postData = response.data.posts;
      setPostData(postData);
    } catch (error) {
      console.error("Error fetching post data:", error);
      // toast.error("Failed to fetch posts. Please try again.");
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
    setUserData({});
    setIsLoggedIn(false);
    setMatchedUsers([]);
    toast.success("Logged out successfully!");
  };

  const formatTime = (timestamp) => {
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);

    if (seconds < 60) {
      return Math.floor(seconds) + " sec ago";
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return minutes + " min ago";
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return hours + " h ago";
    }

    const days = Math.floor(hours / 24);
    if (days < 10) {
      return days + " d ago";
    }

    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        saveUserData,
        loginUser,
        isLoggedIn,
        logoutUser,
        createPost,
        postData,
        fetchPostData,
        formatTime,
        matchedUsers,
        setMatchedUsers,
        userMatched,
        userForgotPassword,
        setforogtPassword,
        forogtPassword,
        setUserData,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default RegisterContext;
