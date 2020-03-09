import orderActionTypes from "./order.types";

export const processPaymentStart = (
  token,
  cartItems,
  addressId,
  deliverySpeed
) => ({
  type: orderActionTypes.PROCESS_PAYMENT_START,
  payload: { token, cartItems, addressId, deliverySpeed }
});

export const processPaymentSuccess = order => ({
  type: orderActionTypes.PROCESS_PAYMENT_SUCCESS,
  payload: order
});

export const processPaymentFailure = error => ({
  type: orderActionTypes.PROCESS_PAYMENT_FAILURE,
  payload: error
});
