import { INIT_STATE } from "../../constant";
import { getProducts, getType, createProduct } from "../action";

export default function productsReducers(state = INIT_STATE.products, action) {
  switch (action.type) {
    //products
    case getType(getProducts.getProductsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getProducts.getProductsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getProducts.getProductsFailure):
      return {
        ...state,
        isLoading: false,
      };
      //create product
    case getType(createProduct.createProductSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    // case getType(updateProduct.updateProductSuccess):
    //   return {
    //     ...state,
    //     data: state.data.map((product) =>
    //       product._id === action.payload._id ? action.payload : product
    //     ),
    //   };
    default:
      return state;
  }
}
