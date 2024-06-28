import React, { useContext } from "react";
import { UserContext } from "../../utils/RegisterContext";
import SideNav from "./SideNav";
import ShareWith from "../post/ShareWith";
import ChatList from "../chat/chatList";
import PostView from "../post/postView";
 

const home = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="row">
        <div className="col-md-3 side-nav-main">
          <SideNav />
        </div>
        <div className="col-md-6 share-main">
          <ShareWith />
          <div className="share-main-post-list">
            <PostView />
          </div>
        </div>
        <div className="col-md-3 p-0 share-main-end-main">
          <ChatList userData={userData} />
        </div>
      </div>
    </>
  );
};

export default home;
