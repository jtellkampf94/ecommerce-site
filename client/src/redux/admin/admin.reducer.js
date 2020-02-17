import AdminActionTypes from "./admin.types";

const INITIAL_STATE = {
  currentAdmin: null,
  loginError: {},
  registerError: {}
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.ADMIN_SIGN_IN_SUCCESS:
    case AdminActionTypes.ADMIN_REGISTER_SUCCESS:
      return {
        ...state,
        currentAdmin: action.payload,
        registerError: {},
        loginError: {}
      };
    case AdminActionTypes.ADMIN_SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentAdmin: null,
        loginError: {},
        registerError: {}
      };
    case AdminActionTypes.ADMIN_REGISTER_FAILURE:
      return { ...state, loginError: {}, registerError: action.payload };
    case AdminActionTypes.ADMIN_SIGN_OUT_FAILURE:
    case AdminActionTypes.ADMIN_SIGN_IN_FAILURE:
      return { ...state, loginError: action.payload, registerError: {} };

    default:
      return state;
  }
};

export default adminReducer;
