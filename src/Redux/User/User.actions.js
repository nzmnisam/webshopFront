import axios from "axios";
import userTypes from "./User.types";

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const setCurrentAdmin = (admin) => ({
  type: userTypes.SET_AMDIN,
  payload: admin,
});

export const resetAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS,
});

export const signInUser =
  ({ email, password }) =>
  async (dispatch) => {
    if (!email) {
      const error = ["Niste uneli E-mail"];
      dispatch({
        type: userTypes.SIGN_IN_ERROR,
        payload: error,
      });
      return;
    }
    if (!password) {
      const error = ["Niste uneli šifru"];
      dispatch({
        type: userTypes.SIGN_IN_ERROR,
        payload: error,
      });
      return;
    }
    try {
      await axios
        .post(`http://127.0.0.1:8000/api/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          const { user } = res.data;
          localStorage.setItem("token", res.data.token);

          dispatch({
            type: userTypes.SET_CURRENT_USER,
            payload: user,
          });

          dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

export const signInAdmin =
  ({ username, password }) =>
  async (dispatch) => {
    if (!username) {
      const error = ["Niste uneli korisničko ime"];
      dispatch({
        type: userTypes.SIGN_IN_ERROR,
        payload: error,
      });
      return;
    }
    if (!password) {
      const error = ["Niste uneli šifru"];
      dispatch({
        type: userTypes.SIGN_IN_ERROR,
        payload: error,
      });
      return;
    }
    try {
      await axios
        .post(`http://127.0.0.1:8000/api/login/admin`, {
          username: username,
          password: password,
        })
        .then((res) => {
          const { admin } = res.data;
          localStorage.setItem("token", res.data.token);

          dispatch({
            type: userTypes.SET_AMDIN,
            payload: admin,
          });

          dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

export const signUpUser =
  ({ displayName, email, password, confirmPassword }) =>
  async (dispatch) => {
    if (password !== confirmPassword) {
      const error = ["Šifre se ne podudaraju"];
      dispatch({
        type: userTypes.SIGN_UP_ERROR,
        payload: error,
      });
      return;
    }

    try {
      await axios
        .post(`http://127.0.0.1:8000/api/register`, {
          name: displayName,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        })
        .then((res) => {
          const { user } = res.data;
          localStorage.setItem("token", res.data.token);

          dispatch(setCurrentUser(user));
          dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true,
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
