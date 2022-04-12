import handleCart from "./handleCart";
import { combineReducers } from "redux";
import customerReducers from "./customer";
import productsReducers from "./products";
import productDetailReducers from "./product";
import modal from "./modal";

const rootReducers = combineReducers({
  handleCart,
  productDetailReducers,
  customerReducers,
  productsReducers,
  modal,
});
export default rootReducers;
