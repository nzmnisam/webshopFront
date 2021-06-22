import axios from "axios";
import cityTypes from "./City.types";

export const setCurrentCity = (city) => ({
  type: cityTypes.SET_CITY,
  payload: city,
});

export const setCities = () => async (dispatch) => {
  try {
    await axios.get(`http://127.0.0.1:8000/api/cities`).then((res) => {
      const { cities } = res.data;

      dispatch({
        type: cityTypes.SET_CITIES,
        payload: cities,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
