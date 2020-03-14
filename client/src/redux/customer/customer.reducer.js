import CustomerActionTypes from "./customer.types";

const INITIAL_STATE = {
  currentCustomer: null,
  loginError: {},
  registerError: {}
};

const customerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerActionTypes.SIGN_IN_SUCCESS:
    case CustomerActionTypes.CUSTOMER_REGISTER_SUCCESS:
    case CustomerActionTypes.EDIT_CUSTOMER_DETAILS_SUCCESS:
    case CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_SUCCESS:
    case CustomerActionTypes.VALIDATE_RESET_PASSWORD_TOKEN_SUCCESS:
    case CustomerActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        currentCustomer: action.payload,
        registerError: {},
        loginError: {}
      };
    case CustomerActionTypes.SIGN_OUT_SUCCESS:
    case CustomerActionTypes.CLEAR_RESET_PASSWORD_REQUEST:
      return {
        ...state,
        currentCustomer: null,
        registerError: {},
        loginError: {}
      };
    case CustomerActionTypes.SIGN_IN_FAILURE:
    case CustomerActionTypes.SIGN_OUT_FAILURE:
    case CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_FAILURE:
    case CustomerActionTypes.VALIDATE_RESET_PASSWORD_TOKEN_FAILURE:
    case CustomerActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        currentCustomer: null,
        registerError: {},
        loginError: action.payload
      };
    case CustomerActionTypes.CUSTOMER_REGISTER_FAILURE:
    case CustomerActionTypes.EDIT_CUSTOMER_DETAILS_FAILURE:
      return {
        ...state,
        registerError: action.payload,
        loginError: {}
      };
    default:
      return state;
  }
};

export default customerReducer;
