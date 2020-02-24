import { takeLatest, put, all, call } from "redux-saga/effects";

import cartActionTypes from "./cart.types";
import {
  addProductToCartFailure,
  addProductToCartSuccess
} from "./cart.actions";

//--------------WORKER-GENERATORS--------------//
export function* addProductToCart({ payload: product }) {
  if (product.size.length === 0) {
    yield put(addProductToCartFailure({ size: "Please select a size" }));
  } else {
    yield put(addProductToCartSuccess(product));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onAddProductToCartStart() {
  yield takeLatest(cartActionTypes.ADD_PRODUCT_TO_CART_START, addProductToCart);
}

export function* cartSagas() {
  yield all([call(onAddProductToCartStart)]);
}
