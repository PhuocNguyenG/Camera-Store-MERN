import { INIT_STATE } from "../../constant";
import { getProductDetail, getType,delProduct, updateProduct } from "../action";

export default function productDetailReducers(
  state = INIT_STATE.productDetail,
  action
) {
  switch (action.type) {
    //product detail
    case getType(getProductDetail.getProductDetailRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getProductDetail.getProductDetailSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getProductDetail.getProductDetailFailure):
      return {
        ...state,
        isLoading: false,
      };
      case getType(updateProduct.updateProductRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(updateProduct.updateProductFailure):
      return {
        ...state,
        isLoading: false,
      };
      //del
    case getType(delProduct.delProductRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(delProduct.delProductFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}