import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export const PostContext = createContext(null);
import { UserContext } from "./RegisterContext";

const RegisterContext = ({ children }) => {
  const { fetchPostData,formatTime } = useContext(UserContext);
  const [commentText, setCommentText] = useState("");


  const handleLikePost = async (postId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `https://find-one-backend.onrender.com/user/post_like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchPostData();
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error occurred while liking post:", error);
    }
  };

  const postComment = async (postId) => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `https://find-one-backend.onrender.com/user/post_commnet/${postId}`,
        { comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText("");
      fetchPostData();
    } catch (error) {
      console.error("Error occurred while posting comment:", error);
    }
  };

  const handleLikeCommet = async (postId,commentId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `https://find-one-backend.onrender.com/user/post_commnet_like/${postId}/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchPostData();
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error occurred while liking post:", error);
    }
  };

  const handleLikeCommets = async (postId,commentId,commentCommId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        `https://find-one-backend.onrender.com/user/post_commnet_comment_like/${postId}/${commentCommId}/${commentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchPostData();
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error occurred while liking post:", error);
    }
  };
 

  return (
    <PostContext.Provider
      value={{ handleLikePost, postComment, commentText, setCommentText,handleLikeCommet,handleLikeCommets,formatTime }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default RegisterContext;
