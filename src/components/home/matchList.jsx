import React, { useState, useContext, useEffect } from "react";
import { MatchedContext } from "../../utils/MatchedContext";
import { UserContext } from "../../utils/RegisterContext";

const MatchList = () => {
  const { userMatched, userData } = useContext(UserContext);
  const { matchedUsers, feelingShare } = useContext(MatchedContext);
  const [expandedUser, setExpandedUser] = useState(null);

  const toggleExpand = (userId) => {
    setExpandedUser(expandedUser === userId ? null : userId);
  };

  return (
    <div className="share-main-end">
      <h6>Your feeling matched with {matchedUsers.length} people</h6>
          
          
         
      <div className="matched-user-list">
        <div className="row">
          {matchedUsers.map((matcheduser) => (
            <div className="col-md-12 mt-2" key={matcheduser._id}>
              <div className="user-match-card">
                <div className="user-match-card-top">
                  <div>
                    <img src={matcheduser.avatar} alt={matcheduser.username} />
                    <span>{matcheduser.username}</span>
                  </div>
                  <button onClick={() => feelingShare(matcheduser._id)}>
                    {userMatched._id === matcheduser._id ? "Share" : "Pending "}
                  </button>
                </div>
                <div className="user-match-card-bottom">
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      transition: ".25s",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp:
                        expandedUser === matcheduser.id ? "unset" : 2,
                    }}
                  >
                    {matcheduser.reason}
                  </p>
                  {matcheduser.reason.length > 150 && (
                    <div>
                      <button onClick={() => toggleExpand(matcheduser.id)}>
                        {expandedUser === user.id ? "Hide more" : "Show more"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchList;
