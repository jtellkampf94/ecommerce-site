import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";
import history from "../../utils/history";

import setAuthToken from "../../utils/setAuthToken";
import CustomerActionTypes from "./customer.types";
import { closeModal } from "../ui/ui.actions";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  customerRegisterFailure,
  customerRegisterSuccess,
  editCustomerDetailsSuccess,
  editCustomerDetailsFailure,
  resetCustomerPasswordRequestSuccess,
  resetCustomerPasswordRequestFailure,
  validateResetPasswordTokenFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  deleteAccountFailure
} from "./customer.actions";

//--------------WORKER-GENERATORS--------------//

export function* customerRegister({ payload: credentials }) {
  try {
    if (credentials.password !== credentials.confirmPassword) {
      yield put(
        customerRegisterFailure({ confirmPassword: "Passwords don't match" })
      );
    } else {
      delete credentials.confirmPassword;
      const {
        data: { token }
      } = yield axios.post("/api/auth/register", credentials);
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decodedCustomer = jwtDecode(token);
      const { state } = history.location;
      yield put(customerRegisterSuccess(decodedCustomer));
      state ? history.push(state.from.pathname) : history.push("/");
    }
  } catch (error) {
    yield put(customerRegisterFailure(error.response.data));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const {
      data: { token }
    } = yield axios.post("/api/auth/login", {
      email,
      password
    });
    localStorage.setItem("jwtToken", token);
    setAuthToken(token);
    const decodedUser = jwtDecode(token);
    const { state } = history.location;
    yield put(signInSuccess(decodedUser));
    state ? history.push(state.from.pathname) : history.push("/");
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

export function* isCustomerAuthenticated() {
  try {
    if (localStorage.jwtToken) {
      const decodedUser = jwtDecode(localStorage.jwtToken);
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp < currentTime) {
        yield signOut();
      } else {
        setAuthToken(localStorage.jwtToken);
        yield put(signInSuccess(decodedUser));
      }
    } else {
      return;
    }
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* editCustomerDetails({ payload }) {
  const { customerId, customerDetails } = payload;
  try {
    const { data } = yield axios.put(
      `/api/customer/${customerId}`,
      customerDetails
    );
    localStorage.setItem("jwtToken", data.token);
    setAuthToken(data.token);
    yield put(editCustomerDetailsSuccess(data.updatedCustomer));
    history.push("/my-account/settings");
  } catch (error) {
    yield put(editCustomerDetailsFailure(error.response.data));
  }
}

export function* resetCustomerPasswordRequest({ payload: email }) {
  try {
    const { data } = yield axios.post("/api/customer/reset-password", {
      email
    });
    yield put(closeModal());
    yield put(resetCustomerPasswordRequestSuccess(data));
    history.push("/");
  } catch (error) {
    yield put(resetCustomerPasswordRequestFailure(error.response.data));
  }
}

export function* validateResetPasswordToken({ payload: token }) {
  try {
    yield axios.get(`/api/customer/reset-password/${token}`);
  } catch (error) {
    yield put(validateResetPasswordTokenFailure(error.response.data));
  }
}

export function* resetPassword({
  payload: { token, password, confirmPassword }
}) {
  try {
    if (password !== confirmPassword) {
      yield put(
        resetPasswordFailure({ confirmPassword: "Passwords don't match" })
      );
    } else {
      const { data: customer } = yield axios.put(
        "/api/customer/reset-password",
        {
          token,
          password
        }
      );
      yield put(resetPasswordSuccess(customer));
      history.push("/");
    }
  } catch (error) {
    yield put(resetPasswordFailure(error.response.data));
  }
}

export function* deleteAccount({ payload: customerId }) {
  try {
    yield axios.delete(`/api/customer/${customerId}`);
    yield put(closeModal());
    yield signOut();
  } catch (error) {
    yield put(deleteAccountFailure(error.response.data));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onCheckUserSession() {
  yield takeLatest(
    CustomerActionTypes.CHECK_CUSTOMER_IS_LOGGED_IN,
    isCustomerAuthenticated
  );
}

export function* onEmailSignInStart() {
  yield takeLatest(CustomerActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(CustomerActionTypes.SIGN_OUT_START, signOut);
}

export function* onCustomerRegister() {
  yield takeLatest(
    CustomerActionTypes.CUSTOMER_REGISTER_START,
    customerRegister
  );
}

export function* onEditCustomerDetailsStart() {
  yield takeLatest(
    CustomerActionTypes.EDIT_CUSTOMER_DETAILS_START,
    editCustomerDetails
  );
}

export function* onResetCustomerPasswordRequestStart() {
  yield takeLatest(
    CustomerActionTypes.RESET_CUSTOMER_PASSWORD_REQUEST_START,
    resetCustomerPasswordRequest
  );
}

export function* onValidateResetPasswordTokenStart() {
  yield takeLatest(
    CustomerActionTypes.VALIDATE_RESET_PASSWORD_TOKEN_START,
    validateResetPasswordToken
  );
}

export function* onResetPasswordStart() {
  yield takeLatest(CustomerActionTypes.RESET_PASSWORD_START, resetPassword);
}

export function* onDeleteAccountStart() {
  yield takeLatest(CustomerActionTypes.DELETE_ACCOUNT_START, deleteAccount);
}

export function* customerSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onCustomerRegister),
    call(onSignOutStart),
    call(onEditCustomerDetailsStart),
    call(onResetCustomerPasswordRequestStart),
    call(onValidateResetPasswordTokenStart),
    call(onResetPasswordStart),
    call(onDeleteAccountStart)
  ]);
}
