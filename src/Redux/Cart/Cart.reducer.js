import cartTypes from "./Cart.types";

const INITIAL_STATE = {
  addedToCart: false,
  removedFromCart: false,
  cartProducts: [],
  removeAllFromCart: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.DECREASE_QUANTITY:
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };
    case cartTypes.INCREASE_QUANTITY:
      return {
        ...state,
        cartProducts: state.cartProducts.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        }),
      };
    case cartTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartProducts: state.cartProducts.filter(
          (product) => product.id !== action.payload
        ),
        removedFromCart: true,
      };
    case cartTypes.REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cartProducts: [],
        removeAllFromCart: true,
      };
    case cartTypes.SET_CART_PRODUCTS:
      return {
        ...state,
        cartProducts: [...state.cartProducts, action.payload],
        addedToCart: true,
      };
    case cartTypes.ADD_FROM_LOCAL_STORAGE:
      return {
        ...state,
        cartProducts: action.payload,
        addedToCart: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
