import { all, call } from "redux-saga/effects";

import { customerSagas } from "./customer/customer.sagas";
import { adminSagas } from "./admin/admin.sagas";
import { productSagas } from "./product/product.sagas";

export default function* rootSaga() {
  yield all([call(customerSagas), call(adminSagas), call(productSagas)]);
}
