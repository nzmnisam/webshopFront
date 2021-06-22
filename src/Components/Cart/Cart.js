import React from "react";
import { useSelector } from "react-redux";

import "./Cart.css";

const mapState = ({ cart }) => ({
  cartProducts: cart.cartProducts,
});

const Cart = ({ products }) => {
  const { cartProducts } = useSelector(mapState);
  return (
    <div className="cartWrapper">
      <h1>Korpa</h1>
      <div className="productsInCart">
        <ul className="productList">
          {cartProducts &&
            cartProducts[0] &&
            cartProducts.map((product) => (
              <li className="productItem">{product.name}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
