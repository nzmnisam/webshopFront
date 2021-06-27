import React from "react";
import Button from "../../Buttons/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../../Redux/Cart/Cart.actions";

const Product = ({ name, price, category_id, sale_id, id, thumbnail }) => {
  const product = {
    name,
    price,
    category_id,
    sale_id,
    thumbnail,
    id,
  };
  const dispatch = useDispatch();
  if (!name || typeof price === "undefined" || !category_id) {
    return null;
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="product">
      <Link to={`/product/${id}`}>
        <div className="thumbnail">
          <img src={"data:image/jpeg;base64," + thumbnail} alt={name} />
        </div>
        <div className="details">
          <ul>
            <li key={name}>
              <span className="name">{name}</span>
            </li>
            <li key={price}>
              <span className="price">{price}</span> RSD
            </li>
          </ul>
        </div>
      </Link>
      <div className="addToCart">
        <Button
          buttonStyle={"btn--add--to--cart"}
          onClick={() => {
            handleAddToCart(product);
          }}
        >
          {" "}
          Dodaj u korpu
        </Button>
      </div>
    </div>
  );
};

export default Product;
