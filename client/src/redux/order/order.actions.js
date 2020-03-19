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

export const clearPurchasedOrder = () => ({
  type: orderActionTypes.CLEAR_PURCHASED_ORDER
});

export const fetchOrdersStart = () => ({
  type: orderActionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = orders => ({
  type: orderActionTypes.FETCH_ORDERS_SUCCESS,
  payload: orders
});

export const fetchOrdersFailure = error => ({
  type: orderActionTypes.FETCH_ORDERS_FAILURE,
  payload: error
});

export const fetchOrderStart = orderId => ({
  type: orderActionTypes.FETCH_ORDER_START,
  payload: orderId
});

export const fetchOrderSuccess = order => ({
  type: orderActionTypes.FETCH_ORDER_SUCCESS,
  payload: order
});

export const fetchOrderFailure = error => ({
  type: orderActionTypes.FETCH_ORDER_FAILURE,
  payload: error
});
