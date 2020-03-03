import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";

import history from "../../utils/history";

import addressActionTypes from "./address.types";
import { closeModal } from "../ui/ui.actions";
import {
  fetchCustomerAddressesStart,
  fetchCustomerAddressesSuccess,
  fetchCustomerAddressesFailure,
  fetchCustomerAddressSuccess,
  fetchCustomerAddressFailure,
  addCustomerAddressSuccess,
  addCustomerAddressFailure,
  deleteCustomerAddressFailure,
  updateCustomerAddressFailure
} from "./address.actions";

//--------------WORKER-GENERATORS--------------//

export function* fetchAddresses() {
  try {
    const { data: addresses } = yield axios.get("/api/addresses");
    yield put(fetchCustomerAddressesSuccess(addresses));
  } catch (error) {
    yield put(fetchCustomerAddressesFailure(error));
  }
}

export function* fetchAddress({ payload: addressId }) {
  try {
    const { data: address } = yield axios.get(`/api/addresses/${addressId}`);
    yield put(fetchCustomerAddressSuccess(address));
  } catch (error) {
    yield put(fetchCustomerAddressFailure(error));
  }
}

export function* addAddress({ payload: address }) {
  try {
    const { data: savedAddress } = yield axios.post("/api/addresses", address);
    yield put(addCustomerAddressSuccess(savedAddress));
    yield put(fetchCustomerAddressesStart());
  } catch (error) {
    yield put(addCustomerAddressFailure(error.response.data));
  }
}

export function* deleteAddress({ payload: addressId }) {
  try {
    yield axios.delete(`/api/addresses/${addressId}`);
    yield put(closeModal());
    yield put(fetchCustomerAddressesStart());
    history.push("/");
  } catch (error) {
    yield put(deleteCustomerAddressFailure(error));
  }
}

export function* updateAddress({ payload }) {
  try {
    yield axios.put(`/api/addresses/${payload.addressId}`, payload.address);
    yield put(fetchCustomerAddressesStart());
    history.push("/");
  } catch (error) {
    yield put(updateCustomerAddressFailure(error.response.data));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onFetchCustomerAddressesStart() {
  yield takeLatest(
    addressActionTypes.FETCH_CUSTOMER_ADDRESSES_START,
    fetchAddresses
  );
}

export function* onFetchCustomerAddressStart() {
  yield takeLatest(
    addressActionTypes.FETCH_CUSTOMER_ADDRESS_START,
    fetchAddress
  );
}

export function* onAddCustomerAddressStart() {
  yield takeLatest(addressActionTypes.ADD_CUSTOMER_ADDRESS_START, addAddress);
}

export function* onUpdateCustomerAddressStart() {
  yield takeLatest(
    addressActionTypes.UPDATE_CUSTOMER_ADDRESS_START,
    updateAddress
  );
}

export function* onDeleteCustomerAddressStart() {
  yield takeLatest(
    addressActionTypes.DELETE_CUSTOMER_ADDRESS_START,
    deleteAddress
  );
}

export function* addressSagas() {
  yield all([
    call(onFetchCustomerAddressesStart),
    call(onFetchCustomerAddressStart),
    call(onAddCustomerAddressStart),
    call(onUpdateCustomerAddressStart),
    call(onDeleteCustomerAddressStart)
  ]);
}
