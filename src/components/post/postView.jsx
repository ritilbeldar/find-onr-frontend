import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../../utils/RegisterContext";
import { PostContext } from "../../utils/PostContext";
import { toast } from "react-toastify";
import PostModal from "./postModal";
import { MatchedContext } from "../../utils/MatchedContext";
import { ChatContext } from "../../utils/ChatContext";

const ShareWith = () => {
  const { addInChat, handleShow } = useContext(ChatContext);
  const { postData, fetchPostData, userData, formatTime } =
    useContext(UserContext);
  const { feelingShare } = useContext(MatchedContext);
  const { handleLikePost } = useContext(PostContext);
  const [expandedUsers, setExpandedUsers] = useState({});

  const shareRef = useRef(null);

  useEffect(() => {
    fetchPostData();
  }, []);

  const toggleExpand = (postId) => {
    setExpandedUsers((prevExpandedUsers) => ({
      ...prevExpandedUsers,
      [postId]: !prevExpandedUsers[postId],
    }));
  };

  const handleShareClick = (postId) => {
    const postUrl = window.location.origin + `/post/${postId}`;
    navigator.clipboard.writeText(postUrl);
    toast.success("Post URL copied to clipboard!");
  };

  return (
    <div className="row">
      {postData.length === 0 ? (
        <div className="col-md-12 text-center text-white mt-5">
          <h2>Share your feeling...</h2>
        </div>
      ) : (
        postData.reverse().map((post, i) => (
          <div className="col-md-12" key={post._id}>
            <div className="card-box">
              <div className="post-view-card">
                <div className="post-view-card-top">
                  <div>
                    <img src={`${post.user.avatar}`} alt="" />
                    <span>{post.user.username} </span>
                    <p>{formatTime(post.createdAt)}</p>
                  </div>
                  {userData._id !== post.user._id && (
                    <div className="Connect-button">
                      {post.user.matched.some(
                        (match) => match._id === userData._id
                      ) &&
                      userData.matched.some(
                        (match) => match._id === post.user._id
                      ) ? (
                        userData.chatList.some(
                          (match) => match._id === post.user._id
                        ) ? (
                          <button className="button3" onClick={handleShow}>
                            <i className="fa-solid fa-comments"></i> Chat
                          </button>
                        ) : (
                          <button
                            className="button3"
                            onClick={() => addInChat(post.user._id)}
                          >
                            <i className="fa-solid fa-comments"></i> Chat
                          </button>
                        )
                      ) : userData.matched.some(
                          (match) => match._id === post.user._id
                        ) ? (
                        <button
                          className="button2"
                          onClick={() => feelingShare(post.user._id)}
                        >
                          Pending
                        </button>
                      ) : (
                        <button
                          className="button1"
                          onClick={() => feelingShare(post.user._id)}
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  )}
                  <span className="post-view-card-top-span">{post.feeling}</span>
                </div>
                <div className="post-view-card-center">
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      transition: ".25s",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: expandedUsers[post._id] ? "unset" : 4,
                    }}
                  >
                    {post.caption}
                  </p>
                  {post.caption.length > 250 && (
                    <div>
                      <button onClick={() => toggleExpand(post._id)}>
                        {expandedUsers[post._id] ? "Hide more" : "Show more"}
                      </button>
                    </div>
                  )}
                </div>
                <div className="post-view-card-img">
                  <img src={`${post.postImg.url}`} alt="" />
                </div>
                <div className="post-view-card-bottom">
                  <div className="row">
                    <div
                      className="col-md-4 col-4"
                      onClick={() => handleLikePost(post._id)}
                    >
                      {post.likes.some((like) => like._id === userData._id) ? (
                        <i className="ri-heart-2-fill"></i>
                      ) : (
                        <i className="ri-heart-2-line"></i>
                      )}
                      <span>{post.likes.length}</span>
                    </div>

                    <PostModal
                      post={post}
                      expandedUsers={expandedUsers}
                      userData={userData}
                      handleLikePost={handleLikePost}
                    />
                    <div
                      className="col-md-4 col-4"
                      ref={shareRef}
                      onClick={() => handleShareClick(post._id)}
                    >
                      <i className="ri-share-forward-2-line"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ShareWith;
