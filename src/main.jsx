import React from "react";
import App from "./App.jsx";
import "./global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import PostContext from "./utils/PostContext.jsx";
import RegisterContext from "./utils/RegisterContext.jsx";
import MatchedContext from "./utils/MatchedContext.jsx";
import ChatContext from "./utils/ChatContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <RegisterContext>
      <ChatContext>
        <MatchedContext>
          <PostContext>
            <ToastContainer />
            <App />
          </PostContext>
        </MatchedContext>
      </ChatContext>
    </RegisterContext>
  </BrowserRouter>
);
