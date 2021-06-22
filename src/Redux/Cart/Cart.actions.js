import cartTypes from "./Cart.types";
import { store } from "../createStore";

export const addToCart = (id) => (dispatch) => {
  const { products } = store.getState();
  const { allProducts } = products;
  dispatch({
    type: cartTypes.SET_CART_PRODUCTS,
    payload: allProducts.filter((product) => product.id === id),
  });
  dispatch({
    type: cartTypes.ADD_TO_CART,
    payload: true,
  });
};
