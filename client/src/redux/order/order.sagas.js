import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import jwtDecode from "jwt-decode";

import history from "../../utils/history";
import setAuthToken from "../../utils/setAuthToken";

import orderActionTypes from "./order.types";
import {
  processPaymentSuccess,
  processPaymentFailure,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderSuccess,
  fetchOrderFailure
} from "./order.actions";
import { clearCart } from "../cart/cart.actions";
import { signOut } from "../customer/customer.sagas";

//--------------WORKER-GENERATORS--------------//

export function* processPayment({ payload }) {
  try {
    const { data } = yield axios.post("/api/payment", payload);
    yield put(processPaymentSuccess(data.order));
    yield put(clearCart());
    history.push("/order-success");
  } catch (error) {
    yield put(processPaymentFailure({ card: "Card payment failed" }));
  }
}

export function* fetchOrders() {
  try {
    const decodedUser = jwtDecode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      yield signOut();
    } else {
      setAuthToken(localStorage.jwtToken);

      const { data: orders } = yield axios.get("/api/orders");
      yield put(fetchOrdersSuccess(orders));
    }
  } catch (error) {
    yield put(fetchOrdersFailure(error.response.data));
  }
}

export function* fetchOrder({ payload: orderId }) {
  try {
    const decodedUser = jwtDecode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      yield signOut();
    } else {
      setAuthToken(localStorage.jwtToken);

      const { data: orders } = yield axios.get(`/api/orders/${orderId}`);
      yield put(fetchOrderSuccess(orders));
    }
  } catch (error) {
    yield put(fetchOrderFailure(error.response.data));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onProcessPaymentStart() {
  yield takeLatest(orderActionTypes.PROCESS_PAYMENT_START, processPayment);
}

export function* onFetchOrdersStart() {
  yield takeLatest(orderActionTypes.FETCH_ORDERS_START, fetchOrders);
}

export function* onFetchOrderStart() {
  yield takeLatest(orderActionTypes.FETCH_ORDER_START, fetchOrder);
}

export function* orderSagas() {
  yield all([
    call(onProcessPaymentStart),
    call(onFetchOrdersStart),
    call(onFetchOrderStart)
  ]);
}
