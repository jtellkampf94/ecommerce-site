import AdminActionTypes from "./admin.types";

//----------------------LOG-IN-ACTIONS----------------------//

export const adminEmailSignInStart = emailAndPassword => ({
  type: AdminActionTypes.ADMIN_EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});

export const adminSignInSuccess = user => ({
  type: AdminActionTypes.ADMIN_SIGN_IN_SUCCESS,
  payload: user
});

export const adminSignInFailure = error => ({
  type: AdminActionTypes.ADMIN_SIGN_IN_FAILURE,
  payload: error
});

export const checkAdminSignedIn = () => ({
  type: AdminActionTypes.CHECK_ADMIN_SIGNED_IN
});

export const adminSignOutStart = () => ({
  type: AdminActionTypes.ADMIN_SIGN_OUT_START
});

export const adminSignOutSuccess = () => ({
  type: AdminActionTypes.ADMIN_SIGN_OUT_SUCCESS
});

export const adminSignOutFailure = error => ({
  type: AdminActionTypes.ADMIN_SIGN_OUT_FAILURE,
  payload: error
});

//----------------------REGISTER-ACTIONS----------------------//

export const adminRegisterStart = adminCredentials => ({
  type: AdminActionTypes.ADMIN_REGISTER_START,
  payload: adminCredentials
});

export const adminRegisterSuccess = admin => ({
  type: AdminActionTypes.ADMIN_REGISTER_SUCCESS,
  payload: admin
});

export const adminRegisterFailure = error => ({
  type: AdminActionTypes.ADMIN_REGISTER_FAILURE,
  payload: error
});
