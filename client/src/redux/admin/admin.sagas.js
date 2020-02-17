import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";

import history from "../../utils/history";
import setAuthToken from "../../utils/setAuthToken";
import AdminActionTypes from "./admin.types";
import {
  adminSignInFailure,
  adminSignInSuccess,
  adminSignOutSuccess,
  adminSignOutFailure,
  adminRegisterSuccess,
  adminRegisterFailure
} from "./admin.actions";

//--------------WORKER-GENERATORS--------------//

export function* adminSignInWithEmail({ payload: { email, password } }) {
  try {
    const {
      data: { token }
    } = yield axios.post("/api/admin/auth/login", {
      email,
      password
    });
    localStorage.setItem("adminJwtToken", token);
    setAuthToken(token);
    const decodedAdmin = jwtDecode(token);
    const { state } = history.location;
    yield put(adminSignInSuccess(decodedAdmin));
    state ? history.push(state.from.pathname) : history.push("/admin/products");
  } catch (error) {
    yield put(adminSignInFailure(error.response.data));
  }
}

export function* isAdminAuthenticated() {
  try {
    if (localStorage.adminJwtToken) {
      const decodedAdmin = jwtDecode(localStorage.adminJwtToken);
      const currentTime = Date.now() / 1000;
      if (decodedAdmin.exp < currentTime) {
        yield signAdminOut();
      } else {
        setAuthToken(localStorage.adminJwtToken);
        yield put(adminSignInSuccess(decodedAdmin));
      }
    } else {
      return;
    }
  } catch (error) {
    yield put(adminSignInFailure(error));
  }
}

export function* signAdminOut() {
  try {
    localStorage.removeItem("adminJwtToken");
    setAuthToken(false);
    yield put(adminSignOutSuccess());
  } catch (error) {
    yield put(adminSignOutFailure(error));
  }
}

export function* adminRegister({ payload: credentials }) {
  try {
    if (credentials.password !== credentials.confirmPassword) {
      yield put(
        adminRegisterFailure({ confirmPassword: "Passwords don't match" })
      );
    } else {
      delete credentials.confirmPassword;
      const {
        data: { token }
      } = yield axios.post("/api/admin/auth/register", credentials);
      localStorage.setItem("adminJwtToken", token);
      setAuthToken(token);
      const decodedAdmin = jwtDecode(token);
      const { state } = history.location;
      yield put(adminRegisterSuccess(decodedAdmin));
      state
        ? history.push(state.from.pathname)
        : history.push("/admin/products");
    }
  } catch (error) {
    yield put(adminRegisterFailure(error.response.data));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onCheckAdminSignedIn() {
  yield takeLatest(
    AdminActionTypes.CHECK_ADMIN_SIGNED_IN,
    isAdminAuthenticated
  );
}

export function* onAdminEmailSignInStart() {
  yield takeLatest(
    AdminActionTypes.ADMIN_EMAIL_SIGN_IN_START,
    adminSignInWithEmail
  );
}

export function* onAdminSignOutStart() {
  yield takeLatest(AdminActionTypes.ADMIN_SIGN_OUT_START, signAdminOut);
}

export function* onAdminRegisterStart() {
  yield takeLatest(AdminActionTypes.ADMIN_REGISTER_START, adminRegister);
}

export function* adminSagas() {
  yield all([
    call(onAdminEmailSignInStart),
    call(onCheckAdminSignedIn),
    call(onAdminSignOutStart),
    call(onAdminRegisterStart)
  ]);
}
