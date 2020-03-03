import addressActionTypes from "./address.types";

const INITIAL_STATE = {
  addresses: [],
  selectedAddress: null,
  error: {}
};

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case addressActionTypes.FETCH_CUSTOMER_ADDRESSES_SUCCESS:
      return {
        ...state,
        selectedAddress: null,
        addresses: action.payload,
        error: {}
      };
    case addressActionTypes.FETCH_CUSTOMER_ADDRESS_SUCCESS:
    case addressActionTypes.ADD_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        selectedAddress: action.payload,
        error: {}
      };
    case addressActionTypes.FETCH_CUSTOMER_ADDRESSES_FAILURE:
    case addressActionTypes.FETCH_CUSTOMER_ADDRESS_FAILURE:
    case addressActionTypes.ADD_CUSTOMER_ADDRESS_FAILURE:
    case addressActionTypes.UPDATE_CUSTOMER_ADDRESS_FAILURE:
    case addressActionTypes.DELETE_CUSTOMER_ADDRESS_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default addressReducer;
