import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Cookies from "js-cookie";
import { UserContext } from "../../utils/RegisterContext";

const PostModal = ({ comment, userData, post }) => {
  const { fetchPostData } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [commcommentText, setCommCommentText] = useState("");
  const [show, setShow] = useState(false);
  const postCommComment = async (postId, commId) => {
    try {
      const token = Cookies.get("token");
      await axios.post(
        `https://find-one-backend.onrender.com/user/post_commnet_comment/${postId}/${commId}`,
        { comment: commcommentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommCommentText("");
      fetchPostData();
      setShow(false);
    } catch (error) {
      console.error("Error occurred while posting comment:", error);
    }
  };

  return (
    <>
      <div onClick={() => setShow(true)}>
        <i className="ri-question-answer-line"></i>
        <span>Reply</span>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
        className="post-modal"
      >
        <Modal.Body className=" post-modal-body post-modal-body-new">
          <div className="row">
          <div className="col-12 d-flex justify-content-end mb-3">
            <button
                type="button"
                className="btn-close bg-white"
                aria-label="Close"
                onClick={() => setShow(false)}
              ></button>
            </div>
            <div className="col-md-12">
              <div className="post-commnet-box">
                <div className="post-commnet-box-top post-commnet-box-top-new row">
                  <div className="post-commnet-card post-commnet-card-new">
                    <div className="post-commnet-card-top">
                      <img src={`${comment.user.avatar}`} alt="" />
                    </div>
                    <div className="post-commnet-card-bottom">
                      <div>
                        <span>{comment.user.username}</span>
                      </div>
                      <p className="mt-2">{comment.text}</p>
                    </div>
                  </div>
                </div>
                <div className="post-commnet-box-top mt-4">
                  <div className="post-commnet-box-top-left">
                    <img src={`${userData.avatar}`} alt="" />
                  </div>
                  <div className="post-commnet-box-top-rigth">
                    <span>
                      <a href="">@{comment.user.username}</a>
                    </span>
                    <div>
                      <textarea
                        placeholder="Add your comment..."
                        value={commcommentText}
                        onChange={(e) => setCommCommentText(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <button type="submit" disabled={loading} onClick={() => postCommComment(post._id, comment._id)}>
              {loading ? (
                <i className="fa fa-spinner fa-spin"></i>
              ) : (
                "Post"
              )}
            </button>
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
