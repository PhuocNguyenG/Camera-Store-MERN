import { INIT_STATE } from "../../constant";
import { getCustomer, getType } from "../action";

export default function customerReducers(state = INIT_STATE.customer, action) {
  switch (action.type) {
    case getType(getCustomer.getCustomerRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCustomer.getCustomerSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getCustomer.getCustomerFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
