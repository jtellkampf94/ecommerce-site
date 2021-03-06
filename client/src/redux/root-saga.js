import { all, call } from "redux-saga/effects";

import { customerSagas } from "./customer/customer.sagas";
import { adminSagas } from "./admin/admin.sagas";
import { productSagas } from "./product/product.sagas";
import { cartSagas } from "./cart/cart.sagas";
import { addressSagas } from "./address/address.sagas";
import { orderSagas } from "./order/order.sagas";

export default function* rootSaga() {
  yield all([
    call(customerSagas),
    call(adminSagas),
    call(productSagas),
    call(cartSagas),
    call(addressSagas),
    call(orderSagas)
  ]);
}
