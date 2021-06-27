import cartTypes from "./Cart.types";
import axios from "axios";

export const addToCart = (product) => async (dispatch, getState) => {
  const { cart, user } = getState();
  const { addedToCart, removedFromCart, cartProducts, removeAllFromCart } =
    cart;

  const inCart = cartProducts.find(
    (productInCart) => productInCart.id === product.id
  );
  if (inCart) {
    console.log(inCart);
    dispatch(increaseQuantity(product));
  } else {
    product.quantity = 1;
    dispatch({
      type: cartTypes.SET_CART_PRODUCTS,
      payload: product,
    });

    const cartForLS = {
      ...cart,
      cartProducts: [...cartProducts, product],
      addedToCart: true,
    };

    localStorage.setItem("cart", JSON.stringify(cartForLS));

    try {
      if (user.currentUser) {
        await axios.post(`http://127.0.0.1:8000/api/cart/`, {
          user_id: user.currentUser.id,
          product_id: product.id,
        });
      } else if (user.currentAdmin) {
        await axios.post(`http://127.0.0.1:8000/api/cart/`, {
          admin_id: user.currentAdmin.id,
          product_id: product.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const addProductsFromLSToCart = () => (dispatch) => {
  const cartFromLS = JSON.parse(localStorage.getItem("cart"));
  if (cartFromLS) {
    dispatch({
      type: cartTypes.ADD_FROM_LOCAL_STORAGE,
      payload: cartFromLS.cartProducts,
    });
  }
  //dodavanje iz korpe u bazu - gotovo
  //brisanje pojedinacnog proizvoda iz korpe, brisanje svih proizvoda iz korpe, kupovina (setovanje da je korisnik kupio nesto)
  //pamti korpu za usera! - gotovo

  //fetchovanje korpe sa backa je u app.js
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  const { cart, user } = getState();
  dispatch({
    type: cartTypes.REMOVE_FROM_CART,
    payload: id,
  });

  try {
    if (user.currentUser) {
      await axios.post(`http://127.0.0.1:8000/api/cart/many`, {
        user_id: user.currentUser.id,
        product_id: id,
      });
    } else if (user.currentAdmin) {
      await axios.post(`http://127.0.0.1:8000/api/cart/many`, {
        admin_id: user.currentAdmin.id,
        product_id: id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeAllFromCart = () => async (dispatch, getState) => {
  const { user } = getState();
  dispatch({
    type: cartTypes.REMOVE_ALL_FROM_CART,
  });

  try {
    if (user.currentUser) {
      await axios.post(`http://127.0.0.1:8000/api/cart/all`, {
        user_id: user.currentUser.id,
      });
    } else if (user.currentAdmin) {
      await axios.post(`http://127.0.0.1:8000/api/cart/all`, {
        admin_id: user.currentAdmin.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const decreaseQuantity = (product) => async (dispatch, getState) => {
  const { user } = getState();

  const currentQuantity = product.quantity;
  const newQuantity = currentQuantity - 1;
  product.quantity = newQuantity;

  dispatch({
    type: cartTypes.DECREASE_QUANTITY,
    payload: product,
  });

  //deleting from database
  try {
    if (user.currentUser) {
      await axios.post(`http://127.0.0.1:8000/api/cart/one`, {
        user_id: user.currentUser.id,
        product_id: product.id,
      });
    } else if (user.currentAdmin) {
      await axios.post(`http://127.0.0.1:8000/api/cart/one`, {
        admin_id: user.currentAdmin.id,
        product_id: product.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const increaseQuantity = (product) => async (dispatch, getState) => {
  const { user, cart } = getState();

  let currentQuantity = 0;
  if (!product.quantity) {
    // const cart = JSON.parse(localStorage.getItem("cart"));
    const productInCart = cart.cartProducts.find(
      (productInCart) => productInCart.id === product.id
    );

    if (productInCart) {
      currentQuantity = productInCart.quantity;
      console.log(currentQuantity);
    }
  } else {
    currentQuantity = product.quantity;
  }
  const newQuantity = currentQuantity + 1;
  product.quantity = newQuantity;
  //nadji u korpi iz LS proizvod i zameni ga sa novim kome je promenjena kolicina

  console.log(product.quantity, "kolicina nakon povecanja");
  console.log("evo me da povecam kolicinu");
  dispatch({
    type: cartTypes.INCREASE_QUANTITY,
    payload: product,
  });

  try {
    if (user.currentUser) {
      await axios.post(`http://127.0.0.1:8000/api/cart/`, {
        user_id: user.currentUser.id,
        product_id: product.id,
      });
    } else if (user.currentAdmin) {
      await axios.post(`http://127.0.0.1:8000/api/cart/`, {
        admin_id: user.currentAdmin.id,
        product_id: product.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const buy = () => async (dispatch, getState) => {
  const { cart, user } = getState();

  const productsIdAndQuantity = [];
  cart.cartProducts.forEach((product) => {
    const productIdAndQ = {
      id: product.id,
      quantity: product.quantity,
    };
    productsIdAndQuantity.push(productIdAndQ);
  });

  try {
    const postBuy = await axios.post(
      `http://127.0.0.1:8000/api/kupuje`,
      {
        user_id: user.currentUser.id,
        products: productsIdAndQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (postBuy.data) {
      dispatch(removeAllFromCart());
    }
  } catch (error) {
    console.log(error);
  }
};
