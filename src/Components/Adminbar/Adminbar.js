import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import "./Adminbar.css";

const mapState = ({ user }) => ({
  currentAdmin: user.currentAdmin,
});

const Adminbar = (props) => {
  const { currentAdmin } = useSelector(mapState);

  if (!currentAdmin) {
    return null;
  }
  return (
    <div className="adminBar">
      <ul className="admin-menu">
        <li>
          <Link to="/admin" className="adminbar-links">
            Administrator
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Adminbar;
