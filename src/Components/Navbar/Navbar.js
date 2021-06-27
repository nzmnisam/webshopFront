import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Button from "../Buttons/Button";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

import {
  setCurrentAdmin,
  setCurrentUser,
  resetAuthForms,
} from "../../Redux/User/User.actions";

const mapState = ({ user, cart }) => ({
  currentUser: user.currentUser,
  currentAdmin: user.currentAdmin,
  cartProducts: cart.cartProducts,
});

const Navbar = (props) => {
  const { currentUser, currentAdmin, cartProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const history = useHistory();

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    dispatch(resetAuthForms());

    dispatch(setCurrentUser(null));
    dispatch(setCurrentAdmin(null));
    // window.location.reload();
    history.push("/");
  };

  const calculateCartProductNumber = () => {
    let quantity = 0;
    if (cartProducts && cartProducts[0])
      cartProducts.forEach((product) => (quantity += product.quantity));
    return quantity;
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
            <Button buttonStyle={"btn--secondary"} className="cartButton">
              <i className="fas fa-shopping-cart"></i>
              <div className="cartNumber">
                <span>{calculateCartProductNumber()}</span>
              </div>
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
