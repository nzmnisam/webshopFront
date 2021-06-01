import userTypes from "./User.types";

const INITIAL_STATE = {
  currentUser: null,
  currentAdmin: null,
  signInSuccess: false,
  signInError: [],
  signUpSuccess: false,
  signUpError: [],
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case userTypes.SET_AMDIN:
      return {
        ...state,
        currentAdmin: action.payload,
      };
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signInSuccess: action.payload,
      };
    case userTypes.SIGN_IN_ERROR:
      return {
        ...state,
        signInError: action.payload,
      };
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpSuccess: action.payload,
      };
    case userTypes.SIGN_UP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case userTypes.RESET_AUTH_FORMS:
      return {
        ...state,
        signInSuccess: false,
        signInError: [],
        signUpSuccess: false,
        signUpError: [],
      };
    default:
      return state;
  }
};

export default userReducer;
