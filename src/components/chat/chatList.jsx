import React, { useState, useContext, useEffect } from "react";
import ChatView from "../chat/chatView";
import { ChatContext } from "../../utils/ChatContext";

const ChatList = () => {
  const { userData, handleShow,show, setShow} = useContext(ChatContext);

  const handleClose = () => setShow(false);

  if (!userData || !userData.chatList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="share-main-end">
      <h6>Your feeling matched with {userData.chatList.length} people</h6>
      <hr />
      <div className="matched-user-list">
        <div className="row gap-3">
          {userData.chatList.map((user, i) => (
            <div className="col-md-12" key={i}>
              <div className="chat-profile-card" onClick={handleShow}>
                <div className="chat-profile-card-left">
                  <img src={`${user.avatar}`} alt="" />
                </div>
                <div className="chat-profile-card-right">
                  <h5>{user.username}</h5>
                  <h6>{user.feeling}</h6>
                </div>
              </div>
              <ChatView chatUser={user} userData={userData} show={show} handleClose={handleClose} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
