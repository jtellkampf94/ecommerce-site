import CustomerActionTypes from "./customer.types";

export const emailSignInStart = emailAndPassword => ({
  type: CustomerActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const signInSuccess = user => ({
  type: CustomerActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: CustomerActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const checkCustomerLoggedIn = () => ({
  type: CustomerActionTypes.CHECK_CUSTOMER_IS_LOGGED_IN
});

export const signOutStart = () => ({
  type: CustomerActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: CustomerActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: CustomerActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const customerRegisterStart = credentials => ({
  type: CustomerActionTypes.CUSTOMER_REGISTER_START,
  payload: credentials
});

export const customerRegisterSuccess = customer => ({
  type: CustomerActionTypes.CUSTOMER_REGISTER_SUCCESS,
  payload: customer
});

export const customerRegisterFailure = error => ({
  type: CustomerActionTypes.CUSTOMER_REGISTER_FAILURE,
  payload: error
});
