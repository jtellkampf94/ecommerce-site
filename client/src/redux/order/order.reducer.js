import orderActionTypes from "./order.types";

const INITIAL_STATE = {
  currentOrder: null,
  orders: [],
  error: {}
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.PROCESS_PAYMENT_SUCCESS:
      return { ...state, currentOrder: action.payload, error: {} };
    case orderActionTypes.PROCESS_PAYMENT_FAILURE:
      return {
        ...state,
        currentOrder: null,
        orders: [],
        error: action.payload
      };
    case orderActionTypes.CLEAR_PURCHASED_ORDER:
      return {
        ...state,
        currentOrder: null
      };
    default:
      return state;
  }
};

export default orderReducer;
