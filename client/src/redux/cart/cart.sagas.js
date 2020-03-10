import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import cartActionTypes from "./cart.types";
import {
  addProductToCartFailure,
  addProductToCartSuccess,
  addCartProductQuantitySuccess,
  addCartProductQuantityFailure
} from "./cart.actions";

//--------------WORKER-GENERATORS--------------//
export function* addProductToCart({ payload: product }) {
  if (product.size.length === 0) {
    yield put(addProductToCartFailure({ size: "Please select a size" }));
  } else {
    yield put(addProductToCartSuccess(product));
  }
}

export function* AddCartProductQuantity({ payload }) {
  const { productId, item, quantity, size } = payload;
  try {
    const { data: product } = yield axios.get(
      `/api/products/product/${productId}`
    );
    const sizeAndQuantity = product.sizes.filter(
      sizes => sizes.size === size.toString()
    );
    if (sizeAndQuantity[0].quantity >= parseInt(quantity) + 1) {
      yield put(addCartProductQuantitySuccess(item));
    } else {
      yield put(
        addCartProductQuantityFailure({
          cartQuantityIncrement:
            "We do not have any more of this product available",
          productId,
          size
        })
      );
    }
  } catch (error) {
    addCartProductQuantityFailure({
      cartQuantityIncrement: "Something went wrong with our servers",
      productId,
      size
    });
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onAddProductToCartStart() {
  yield takeLatest(cartActionTypes.ADD_PRODUCT_TO_CART_START, addProductToCart);
}

export function* onAddCartProductQuantityStart() {
  yield takeLatest(
    cartActionTypes.ADD_CART_PRODUCT_QUANTITY_START,
    AddCartProductQuantity
  );
}

export function* cartSagas() {
  yield all([
    call(onAddProductToCartStart),
    call(onAddCartProductQuantityStart)
  ]);
}
