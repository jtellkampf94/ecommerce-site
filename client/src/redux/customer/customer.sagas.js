import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";

import setAuthToken from "../../utils/setAuthToken";
import CustomerActionTypes from "./customer.types";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure
} from "./customer.actions";

//--------------WORKER-GENERATORS--------------//

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
    yield put(signInSuccess(decodedUser));
  } catch (error) {
    yield put(signInFailure(error.response.data));
  }
}

export function* isUserAuthenticated() {
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

//--------------WATCHER-GENERATORS--------------//

export function* onCheckUserSession() {
  yield takeLatest(
    CustomerActionTypes.CHECK_CUSTOMER_IS_LOGGED_IN,
    isUserAuthenticated
  );
}

export function* onEmailSignInStart() {
  yield takeLatest(CustomerActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(CustomerActionTypes.SIGN_OUT_START, signOut);
}

export function* customerSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart)
  ]);
}
