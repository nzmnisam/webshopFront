import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

import { setCurrentUser } from "../../Redux/User/User.actions";
import { connect } from "react-redux";

const Navbar = (props) => {
  // let user = null;
  // let admin = null;
  // if (localStorage.getItem("user")) {
  //   user = JSON.parse(localStorage.getItem("user"));
  // }
  // if (localStorage.getItem("admin")) {
  //   admin = JSON.parse(localStorage.getItem("admin"));
  // }

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    // user = null;
    // admin = null;
    props.setCurrentUser(null);
    window.location.reload();
  };

  return (
    <nav className="Navbar">
      <Link to="/" className="navbar-logo">
        WebShop <i className="fas fa-couch"></i>
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link className={item.cName} to={item.url}>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {props.currentUser && (
        <>
          <Button onClick={handleLogout}>Odjavi se</Button>
        </>
      )}

      {!props.currentUser && (
        <>
          <Link to="/registration">
            <Button>Prijavi se</Button>
          </Link>
          <Link to="/login">
            <Button buttonStyle={"btn--secondary"}>Uloguj se</Button>
          </Link>
        </>
      )}
    </nav>
  );
};

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
