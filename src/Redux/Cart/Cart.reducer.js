import cartTypes from "./Cart.types";

const INITIAL_STATE = {
  addedToCart: false,
  removedFromCart: false,
  cartProducts: [],
  removeAllFromCart: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        addedToCart: action.payload,
      };
    case cartTypes.REMOVE_FROM_CART:
      return {
        ...state,
        removedFromCart: action.payload,
      };
    case cartTypes.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        removeAllFromCart: action.payload,
      };
    case cartTypes.SET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
