import React, { useState, useContext, useEffect, useRef } from "react";
import MatchWave from "../home/matchWave";
import { toast } from "react-toastify";
import { UserContext } from "../../utils/RegisterContext";
import { MatchedContext } from "../../utils/MatchedContext";

const ShareWith = () => {
  const { createPost, userData, setUserData } = useContext(UserContext);
  const { feeling, setFeeling } = useContext(MatchedContext);
  const [caption, setCaption] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [showMatchWave, setShowMatchWave] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const fileInputRef = useRef(null);

  const handlePostShare = async () => {
    if (!caption || !feeling) {
      toast.error("Please select feeling and provide a caption .");
      return;
    }

    try {
      await createPost(feeling, caption, postImg);
      setCaption("");
      setPostImg(null);
    } catch (error) {
      console.error("Error sharing post:", error);
      toast.error("Failed to share post. Please try again.");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setFeeling(value);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPostImg(file);
  };

  useEffect(() => {
    setIsFormValid(caption !== "");
  }, [caption]);

  useEffect(() => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      feeling: feeling,
    }));
  }, [feeling, setUserData]);

  return (
    <>
      <div className="row">
        <div className="col-md-12 share-main-top">
          <div className="card-box">
            <div className="row d-flex align-items-center">
              <div className="col-md-6">
                <label htmlFor="">How are you feeling?</label>
              </div>
              <div className="col-md-6 text-end text-white nnnn">
                <h6 className="mt-2 text-capitalize">{userData.feeling}</h6>
              </div>
            </div>
           
            <div className="share-main-top-select mt-2">
              <select
                name="feeling"
                value={feeling}
                onChange={handleInputChange}
                required
              >
                <option >Select Feeling</option>
                <option value="love">Love</option>
                <option value="sad">Sad</option>
                <option value="lonely">Lonely</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-md-12 share-main-top">
          <div className="card-box">
            <div className="share-main-top-input">
              <textarea
                name="caption"
                placeholder="Share your thoughts..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="post-view-card-img">
              {postImg && (
                <img src={URL.createObjectURL(postImg)} alt="Selected" />
              )}
            </div>
            <div className="share-main-top-button">
              <i className="ri-image-add-fill" onClick={handleClick}></i>
              <input
                type="file"
                className="d-none"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <button
                disabled={!isFormValid}
                onClick={handlePostShare}
                style={{ opacity: isFormValid ? 1 : 0.5 }}
              >
                Share
              </button>
            </div>
          </div>
          {showMatchWave && <MatchWave />}
        </div>
      </div>
    </>
  );
};

export default ShareWith;
