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

export const editCustomerDetailsStart = (customerId, customerDetails) => ({
  type: CustomerActionTypes.EDIT_CUSTOMER_DETAILS_START,
  payload: { customerId, customerDetails }
});

export const editCustomerDetailsSuccess = customerDetails => ({
  type: CustomerActionTypes.EDIT_CUSTOMER_DETAILS_SUCCESS,
  payload: customerDetails
});

export const editCustomerDetailsFailure = error => ({
  type: CustomerActionTypes.EDIT_CUSTOMER_DETAILS_FAILURE,
  payload: error
});

export const resetCustomerPasswordRequestStart = email => ({
  type: CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_START,
  payload: email
});

export const resetCustomerPasswordRequestSuccess = message => ({
  type: CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_SUCCESS,
  payload: message
});

export const resetCustomerPasswordRequestFailure = error => ({
  type: CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_FAILURE,
  payload: error
});

export const clearResetPasswordRequest = () => ({
  type: CustomerActionTypes.CLEAR_RESET_PASSWORD_REQUEST
});

export const validateResetPasswordTokenStart = token => ({
  type: CustomerActionTypes.VALIDATE_RESET_PASSWORD_TOKEN_START,
  payload: token
});

export const validateResetPasswordTokenFailure = error => ({
  type: CustomerActionTypes.VALIDATE_RESET_PASSWORD_TOKEN_FAILURE,
  payload: error
});

export const resetPasswordStart = (token, password, confirmPassword) => ({
  type: CustomerActionTypes.RESET_PASSWORD_START,
  payload: { token, password, confirmPassword }
});

export const resetPasswordSuccess = customer => ({
  type: CustomerActionTypes.RESET_PASSWORD_SUCCESS,
  payload: customer
});

export const resetPasswordFailure = error => ({
  type: CustomerActionTypes.RESET_PASSWORD_FAILURE,
  payload: error
});

export const deleteAccountStart = customerId => ({
  type: CustomerActionTypes.DELETE_ACCOUNT_START,
  payload: customerId
});

export const deleteAccountFailure = error => ({
  type: CustomerActionTypes.DELETE_ACCOUNT_FAILURE,
  payload: error
});

export const editPasswordStart = (customerId, passwords) => ({
  type: CustomerActionTypes.EDIT_PASSWORD_START,
  payload: {
    customerId,
    oldPassword: passwords.oldPassword,
    newPassword: passwords.newPassword,
    confirmNewPassword: passwords.confirmNewPassword
  }
});

export const editPasswordSuccess = message => ({
  type: CustomerActionTypes.EDIT_PASSWORD_SUCCESS,
  payload: message
});

export const editPasswordFailure = error => ({
  type: CustomerActionTypes.EDIT_PASSWORD_FAILURE,
  payload: error
});
