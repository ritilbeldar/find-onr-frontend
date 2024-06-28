import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/RegisterContext";
import { ChatContext } from "../../utils/ChatContext";

const SideNav = () => {
  const { logoutUser, userData } = useContext(UserContext);
  const { addInChat, handleShow } = useContext(ChatContext);

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-8">
          <div className="row side-nav">
            <div className="col-4 col-md-12  side-nav-top">
              <img src="/imgs/logo.png" alt="" />
            </div>
            <div className="col-1 col-md-12 side-nav-top-bottom ">
              <ul>
                <li className="active">
                  <Link to="">
                    <i className="ri-home-smile-line"></i> Home
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="ri-notification-3-line"></i> Notification
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="ri-chat-smile-2-line"></i> Chat
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="ri-user-smile-line"></i> {userData.username}
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <i className="ri-settings-5-line"></i> Settings
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-7 col-md-12  side-nav-top-bottom-logout">
              <button onClick={handleLogout}>
                <i className="ri-logout-circle-line"></i> <span>&nbsp;Log Out</span>
              </button>
              <button className="chat-button">
              <i className="ri-chat-1-line"></i>
              <div>0</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
