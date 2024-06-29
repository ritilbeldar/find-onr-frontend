import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import PostCommnetModal from "./postCommentModal";
import CommnetModal from "./commentModal";
import { PostContext } from "../../utils/PostContext";

const PostModal = ({ post, expandedUsers, userData, handleLikePost }) => {
  const [show, setShow] = useState(false);
  const { postComment, commentText, setCommentText, handleLikeCommet,formatTime } =
    useContext(PostContext);
    const [loading, setLoading] = useState(false);



  return (
    <>
      <div className="col-md-4 col-4" onClick={() => setShow(true)}>
        <i className="ri-question-answer-line"></i>
        <span>{post.comments.length}</span>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        className="post-modal"
      >
        <Modal.Body className="post-modal-body">
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
                    <span>{post.user.username} </span>
                  </div>
                  <span className="post-view-card-top-span">
                    {post.feeling}
                  </span>
                </div>
                <div className="post-view-card-center">
                  <p>
                    {post.caption}
                  </p>
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
                <div className="post-commnet-box-top">
                  <div className="post-commnet-box-top-left">
                    <img src={`${userData.avatar}`} alt="" />
                  </div>
                  <div className="post-commnet-box-top-rigth">
                    <textarea
                      placeholder="Add your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      autoFocus
                    />
                     <button type="submit" disabled={loading} onClick={() => postComment(post._id)}>
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Post"
              )}
            </button>
                  </div>
                </div>
                <div className="post-commnet-box-bottom">
                  <h6>{post.comments.length} Comments</h6>
                  <div className="row post-commnet-box-bottom-bottom">
                    {post.comments.reverse().map((comment, i) => (
                      <div className="col-12" key={comment._id}>
                        <div className="post-commnet-card">
                          <div className="post-commnet-card-top">
                            <img src={`${comment.user.avatar}`} alt="" />
                          </div>
                          <div className="post-commnet-card-bottom">
                            <div>
                              <span>{comment.user.username}</span>
                              <p>{formatTime(comment.createdAt)}</p>
                            </div>
                            <p>{comment.text}</p>
                            <div className="post-commnet-card-like-com">
                              <CommnetModal
                                comment={comment}
                                userData={userData}
                                post={post}
                                expandedUsers={expandedUsers}
                              />
                              <div
                                onClick={() =>
                                  handleLikeCommet(post._id, comment._id)
                                }
                              >
                                {comment.commentslikes.some(
                                  (like) => like._id === userData._id
                                ) ? (
                                  <i className="ri-heart-2-fill"></i>
                                ) : (
                                  <i className="ri-heart-2-line"></i>
                                )}
                                <span>{comment.commentslikes.length}</span>
                              </div>
                            </div>
                            {comment.commentsComment.length > 0 && (
                              <PostCommnetModal
                                post={post}
                                expandedUsers={expandedUsers}
                                userData={userData}
                                handleLikePost={handleLikePost}
                                comment={comment}
                              />
                            )}
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
