import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

import {
  setCurrentAdmin,
  setCurrentUser,
  resetAuthForms,
} from "../../Redux/User/User.actions";

const mapState = ({ user, admin }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
});

const Navbar = (props) => {
  const { currentUser, currentAdmin } = useSelector(mapState);
  const dispatch = useDispatch();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(resetAuthForms());

    dispatch(setCurrentUser(null));
    dispatch(setCurrentAdmin(null));
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
          if (currentUser || currentAdmin) {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.url}>
                  {item.title}
                </Link>
              </li>
            );
          } else {
            if (item.url !== "/dashboard") {
              return (
                <li key={index}>
                  <Link className={item.cName} to={item.url}>
                    {item.title}
                  </Link>
                </li>
              );
            }
          }
        })}
      </ul>

      {(currentUser || currentAdmin) && (
        <>
          <Link to="/cart">
            <Button buttonStyle={"btn--secondary"}>
              <i className="fas fa-shopping-cart"></i>
            </Button>
          </Link>
          <Button onClick={handleLogout}>Odjavi se</Button>
        </>
      )}

      {!currentUser && !currentAdmin && (
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

export default Navbar;
