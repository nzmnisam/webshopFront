import cityTypes from "./City.types";

const INITIAL_STATE = {
  cities: [],
  currentCity: null,
};

const cityReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cityTypes.SET_CITY:
      return {
        ...state,
        currentCity: action.payload,
      };
    case cityTypes.SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    default:
      return state;
  }
};

export default cityReducer;
