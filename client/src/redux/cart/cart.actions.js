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

export const removeProductFromCart = productId => ({
  type: cartActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload: productId
});

export const toggleCartHidden = () => ({
  type: cartActionTypes.TOGGLE_CART_HIDDEN
});
