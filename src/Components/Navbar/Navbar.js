import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
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
      <Link to="/registration">
        <Button>Prijavi se</Button>
      </Link>
    </nav>
  );
};

export default Navbar;
