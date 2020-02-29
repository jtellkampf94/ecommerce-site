import addressActionTypes from "./address.types";

export const fetchCustomerAddressesStart = () => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESSES_START
});

export const fetchCustomerAddressesSuccess = addresses => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESSES_SUCCESS,
  payload: addresses
});

export const fetchCustomerAddressesFailure = error => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESSES_FAILURE,
  payload: error
});

export const fetchCustomerAddressStart = addressId => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESS_START,
  payload: addressId
});

export const fetchCustomerAddressSuccess = address => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESS_SUCCESS,
  payload: address
});

export const fetchCustomerAddressFailure = error => ({
  type: addressActionTypes.FETCH_CUSTOMER_ADDRESS_FAILURE,
  payload: error
});

export const addCustomerAddressStart = address => ({
  type: addressActionTypes.ADD_CUSTOMER_ADDRESS_START,
  payload: address
});

export const addCustomerAddressFailure = error => ({
  type: addressActionTypes.ADD_CUSTOMER_ADDRESS_FAILURE,
  payload: error
});

export const updateCustomerAddressStart = (address, addressId) => ({
  type: addressActionTypes.UPDATE_CUSTOMER_ADDRESS_START,
  payload: { address, addressId }
});

export const updateCustomerAddressFailure = error => ({
  type: addressActionTypes.UPDATE_CUSTOMER_ADDRESS_FAILURE,
  payload: error
});

export const deleteCustomerAddressStart = addressId => ({
  type: addressActionTypes.DELETE_CUSTOMER_ADDRESS_START,
  payload: addressId
});

export const deleteCustomerAddressFailure = error => ({
  type: addressActionTypes.DELETE_CUSTOMER_ADDRESS_FAILURE,
  payload: error
});
