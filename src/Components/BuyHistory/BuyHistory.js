import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromHistory,
  setBuyHistory,
} from "../../Redux/BuyHsitory/BuyHistory.actions";
import Button from "../Buttons/Button";
import "./BuyHistory.css";

const mapState = (buyHistory) => ({
  buyHistory: buyHistory.buyHistory,
});

const BuyHistory = () => {
  const { buyHistory } = useSelector(mapState);
  const dispatch = useDispatch();

  const handleRemoveFromHistory = (id) => {
    dispatch(deleteFromHistory(id));
  };
  useEffect(() => {
    dispatch(setBuyHistory());
  }, []);
  return (
    <div className="buyHistoryWrapper">
      <ul className="productsFromHistory">
        {buyHistory.buyHistory[0] &&
          buyHistory.buyHistory.map((product) => (
            <li key={product.id} className="productFromHistory">
              <span className="buyDate">{product.created_at}</span>
              <span className="productName">
                <Link to={`product/${product.id}`}>{product.name}</Link>
              </span>
              <span className="productQuantity">x {product.quantity}</span>{" "}
              <span className="productPrice">
                {product.price * product.quantity} RSD{" "}
              </span>
              <Button
                className="removeOneFromHistory"
                onClick={() => {
                  handleRemoveFromHistory(product.id);
                }}
              >
                X
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BuyHistory;
