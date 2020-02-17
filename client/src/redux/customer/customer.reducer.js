import CustomerActionTypes from "./customer.types";

const INITIAL_STATE = {
  currentCustomer: null,
  error: {}
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.SIGN_IN_SUCCESS:
      return { ...state, currentCustomer: action.payload, error: {} };
    case CustomerActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, currentCustomer: null, error: {} };
    case CustomerActionTypes.SIGN_IN_FAILURE:
    case CustomerActionTypes.SIGN_OUT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default customerReducer;
