import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import history from "../../utils/history";

import orderActionTypes from "./order.types";
import { processPaymentSuccess, processPaymentFailure } from "./order.actions";
import { clearCart } from "../cart/cart.actions";

//--------------WORKER-GENERATORS--------------//

export function* processPayment({ payload }) {
  try {
    const { data } = yield axios.post("/api/payment", payload);
    console.log(data);
    yield put(processPaymentSuccess(data.order));
    yield put(clearCart());
    history.push("/order-success");
  } catch (error) {
    yield put(processPaymentFailure(error));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onProcessPaymentStart() {
  yield takeLatest(orderActionTypes.PROCESS_PAYMENT_START, processPayment);
}

export function* orderSagas() {
  yield all([call(onProcessPaymentStart)]);
}
