import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";
import history from "../../utils/history";

import setAuthToken from "../../utils/setAuthToken";
import CustomerActionTypes from "./customer.types";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  customerRegisterFailure,
  customerRegisterSuccess,
  editCustomerDetailsSuccess,
  editCustomerDetailsFailure
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

export function* customerSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onCustomerRegister),
    call(onSignOutStart),
    call(onEditCustomerDetailsStart)
  ]);
}
