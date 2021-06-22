import React from "react";
import "./UserProfile.css";
import userIMG from "../../Assets/User/userIcon.png";

const UserProfile = (props) => {
  const { currentAdmin } = props;
  const { name } = currentAdmin;
  return (
    <div className="userProfile">
      <ul>
        <li>
          <div className="user-image">
            <img src={userIMG} alt="user-img" />
          </div>
        </li>
        <li>
          <span className="displayName">{name && name}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
