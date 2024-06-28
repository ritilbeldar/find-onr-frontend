import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import CommnetModal from "./commentModal";
import { PostContext } from "../../utils/PostContext";

const PostModal = ({
  post,
  expandedUsers,
  userData,
  handleLikePost,
  comment,
}) => {
  const { handleLikeCommets, formatTime } = useContext(PostContext);
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        className="post-commnet-card-bottom-more"
        onClick={() => setShow(true)}
      >
        <h6>Show {comment.commentsComment.length} more replies</h6>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        className="post-modal"
      >
        <Modal.Body className=" post-modal-body">
          <div className="row">
          <div className="col-12 d-flex justify-content-end mb-3">
            <button
                type="button"
                className="btn-close bg-white"
                aria-label="Close"
                onClick={() => setShow(false)}
              ></button>
            </div>
            <div className="col-md-6">
              <div className="post-view-card">
                <div className="post-view-card-top">
                  <div>
                    <img src={`${post.user.avatar}`} alt="" />
                    <span>{post.user.username}</span>
                  </div>
                  <span className="post-view-card-top-span">
                    {post.feeling}
                  </span>
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

                    <div className="col-md-4 col-4" onClick={() => setShow(true)}>
                      <i className="ri-question-answer-line"></i>
                      <span>{post.comments.length}</span>
                    </div>
                    <div className="col-md-4 col-4">
                      <i className="ri-share-forward-2-line"></i>
                      <span>261</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="post-commnet-box">
                <div className="post-commnet-box-top post-commnet-box-top-new">
                  <div className="post-commnet-card post-commnet-card-new">
                    <div className="post-commnet-card-top">
                      <img src={`${comment.user.avatar}`} alt="" />
                    </div>
                    <div className="post-commnet-card-bottom">
                      <div>
                        <span>{comment.user.username}</span>
                        <p>{formatTime(comment.createdAt)}</p>
                      </div>
                      <p>{comment.text}</p>
                    </div>
                  </div>
                </div>
                <div className="post-commnet-box-bottom">
                  <h6>{comment.commentsComment.length} Comments</h6>
                  <div className="row post-commnet-box-bottom-bottom">
                    {comment.commentsComment.reverse().map((comments, i) => (
                      <div className="col-12" key={comments._id}>
                        <div className="post-commnet-card">
                          <div className="post-commnet-card-top">
                            <img src={`${comments.user.avatar}`} alt="" />
                          </div>
                          <div className="post-commnet-card-bottom">
                            <div>
                              <span>{comments.user.username}</span>
                              <p>{formatTime(comments.createdAt)}</p>
                            </div>
                            <p>{comments.text}</p>
                            <div className="post-commnet-card-like-com">
                              <CommnetModal
                                comment={comments}
                                userData={userData}
                                post={post}
                                expandedUsers={expandedUsers}
                              />

                              <div
                                onClick={() =>
                                  handleLikeCommets(
                                    post._id,
                                    comments._id,
                                    comment._id
                                  )
                                }
                              >
                                {comments.likes.some(
                                  (like) => like._id === userData._id
                                ) ? (
                                  <i className="ri-heart-2-fill"></i>
                                ) : (
                                  <i className="ri-heart-2-line"></i>
                                )}
                                <span>{comments.likes.length}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PostModal;
