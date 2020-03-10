import cartActionTypes from "./cart.types";

export const addProductToCartStart = product => ({
  type: cartActionTypes.ADD_PRODUCT_TO_CART_START,
  payload: product
});

export const addProductToCartSuccess = product => ({
  type: cartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
  payload: product
});

export const addProductToCartFailure = error => ({
  type: cartActionTypes.ADD_PRODUCT_TO_CART_FAILURE,
  payload: error
});

export const removeProductFromCart = product => ({
  type: cartActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload: product
});

export const addCartProductQuantityStart = (
  productId,
  item,
  quantity,
  size
) => ({
  type: cartActionTypes.ADD_CART_PRODUCT_QUANTITY_START,
  payload: { productId, item, quantity, size }
});

export const addCartProductQuantitySuccess = product => ({
  type: cartActionTypes.ADD_CART_PRODUCT_QUANTITY_SUCCESS,
  payload: product
});

export const addCartProductQuantityFailure = error => ({
  type: cartActionTypes.ADD_CART_PRODUCT_QUANTITY_FAILURE,
  payload: error
});

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN
});

export const setDeliveryPrice = deliveryPrice => ({
  type: cartActionTypes.SET_DELIVERY_PRICE,
  payload: deliveryPrice
});

export const clearCart = () => ({
  type: cartActionTypes.CLEAR_CART
});
