import React, { useContext } from "react";
import { UserContext } from "../../utils/RegisterContext";

const matchWave = () => {
  const { userData } = useContext(UserContext);
  return (
    <>
      <div className="circle-ripple">
      <img src={userData.avatar} alt={userData.username} />
      </div>
      <div className="blur"></div>
    </>
  );
};

export default matchWave;
