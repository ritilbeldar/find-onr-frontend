import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import io from "socket.io-client";
import Cookies from "js-cookie";

const socket = io("http://localhost:5000");

function ChatWindow({ show, handleClose, chatUser, userData }) {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      if (inputValue.trim() === "") {
        throw new Error("Message cannot be empty");
      }
      const response = await axios.post(
        "https://find-one-backend.onrender.com/user/send_message",
        {
          sender: userData._id,
          receiver: chatUser._id,
          message: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error(
          "Failed to send message. Unexpected status code: " + response.status
        );
      }
      setInputValue("");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  };

  const adjustInputHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = inputRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    adjustInputHeight();
  }, [inputValue]);

  const fetchChatHistory = async (userId) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `https://find-one-backend.onrender.com/user/chat_history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);

      setChatHistory(data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      // Handle the error and display a meaningful message to the user
      // For example, set a state to indicate that there was an error fetching the chat history
      // setError(true);
    }
  };

  useEffect(() => {
    fetchChatHistory(userData._id);
  }, []);

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      backdrop="static"
      className="bg-dark cheat-mdal"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-light">
          <img className="Offcanvas-Title-img" src={chatUser.avatar} alt="" />
          {chatUser.username}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="chat-view-card-box">
          <div className="chat-view-card-box-top">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`chat-box ${
                  chat.sender === userData._id ? "chat-box1" : "chat-box2"
                }`}
              >
                <p>{chat.message}</p>
              </div>
            ))}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-box ${
                  msg.sender === userData._id ? "chat-box1" : "chat-box2"
                }`}
              >
                <p>{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="chat-view-card-box-bottom">
            <form onSubmit={sendMessage}>
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a message..."
                rows="1"
                autoFocus
              />
              <button>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ChatWindow;
