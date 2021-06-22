import { combineReducers } from "redux";
import modelsReducer from "./3dModels/models.reducer";
import cartReducer from "./Cart/Cart.reducer";
import categoryReducer from "./Category/Category.reducer";
import cityReducer from "./City/City.reducer";
import imagesReducer from "./Images/Images.reducer";
import productReducer from "./Product/Product.reducer";
import userReducer from "./User/User.reducer";

export default combineReducers({
  user: userReducer,
  cities: cityReducer,
  categories: categoryReducer,
  images: imagesReducer,
  products: productReducer,
  models: modelsReducer,
  cart: cartReducer,
});
