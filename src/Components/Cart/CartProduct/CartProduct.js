import React from "react";
import { Link } from "react-router-dom";
import Button from "../../Buttons/Button";
import { useSelector, useDispatch } from "react-redux";
import "./CartProduct.css";
import {
  decreaseQuantity,
  increaseQuantity,
} from "../../../Redux/Cart/Cart.actions";

const CartProduct = ({ product, handleDelete }) => {
  const { id, name, price, sale_id, thumbnail, category_id, quantity } =
    product;

  const dispatch = useDispatch();

  const handleCartMinus = () => {
    dispatch(decreaseQuantity(product));
  };

  const handleCartPlus = () => {
    dispatch(increaseQuantity(product));
  };

  const calculatePrice = () => {
    return quantity * price;
  };

  return (
    <div className="cartProduct">
      <Link to={`/product/${id}`}>
        <img
          className="productThumbnail"
          src={"data:image/jpeg;base64," + thumbnail}
          alt={name}
        />
      </Link>
      <div className="productTitleWrapper">
        <Link to={`/product/${id}`}>
          <h2 className="productTitle">{name}</h2>
        </Link>
      </div>

      <p className="priceTag">{calculatePrice()}RSD</p>
      <div className="quantityChangeWrapper">
        {quantity > 1 && (
          <span onClick={handleCartMinus}>
            <i className="fas fa-minus" />
          </span>
        )}
        {quantity <= 1 && (
          <span>
            <i className="fas fa-minus" />
          </span>
        )}
        <p className="quantity">{quantity}</p>
        <span onClick={handleCartPlus}>
          <i className="fas fa-plus" on />
        </span>
      </div>

      <Button
        className="deleteButton"
        onClick={() => handleDelete(id)}
        style={{ marginLeft: "auto" }}
      >
        X
      </Button>
    </div>
  );
};

export default CartProduct;
