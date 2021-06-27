import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductsFromLSToCart,
  removeAllFromCart,
  removeFromCart,
  buy,
} from "../../Redux/Cart/Cart.actions";
import CartProduct from "./CartProduct/CartProduct";
import Button from "../Buttons/Button";

import "./Cart.css";

const mapState = ({ cart }) => ({
  cartProducts: cart.cartProducts,
});

const Cart = ({ products }) => {
  const { cartProducts } = useSelector(mapState);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState("");
  // useEffect(() => {
  //   dispatch(addProductsFromLSToCart());
  // }, []);

  useEffect(() => {
    calculateTotalPrice(cartProducts);
  }, [cartProducts]);

  const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += parseInt(product.price) * parseInt(product.quantity);
    });
    setTotalPrice(totalPrice.toFixed(2));
  };

  const handleDeleteFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleDeleteAllFromCart = () => {
    dispatch(removeAllFromCart());
  };

  const handleBuy = () => {
    dispatch(buy());
  };

  return (
    <div className="cartWrapper">
      <h1 className="cartTitle">Korpa</h1>
      <div className="productsInCart">
        <ul className="productList">
          {cartProducts &&
            cartProducts[0] &&
            cartProducts.map((product) => (
              <li className="productItem" key={product.id}>
                <CartProduct
                  product={product}
                  handleDelete={handleDeleteFromCart}
                />
              </li>
            ))}
          <li className="totalPriceWrapper">
            <p className="totalPrice">{totalPrice} RSD</p>
          </li>
          {cartProducts[0] ? (
            <li className="cartButtons">
              <Button className="buyButton" onClick={handleBuy}>
                Kupi
              </Button>
              <Button
                className="deleteAllButton"
                onClick={handleDeleteAllFromCart}
              >
                Isprazni korpu
              </Button>
            </li>
          ) : (
            <h2>Korpa je prazna</h2>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Cart;
