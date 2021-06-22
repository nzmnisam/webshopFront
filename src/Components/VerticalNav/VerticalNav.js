import React from "react";
import { useSelector } from "react-redux";
import UserProfile from "../UserProfile/UserProfile";
import "./VerticalNav.css";

const mapState = ({ user }) => ({
  currentAdmin: user.currentAdmin,
});

const VerticalNav = ({ children }) => {
  const { currentAdmin } = useSelector(mapState);
  const configUserProfile = {
    currentAdmin,
  };
  return (
    <div className="verticalNav">
      <UserProfile {...configUserProfile}></UserProfile>
      <div className="menu">{children}</div>
    </div>
  );
};

export default VerticalNav;
