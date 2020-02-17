import cartActionTypes from "./cart.types";

export const addProductToCart = product => ({
  type: cartActionTypes.ADD_PRODUCT_TO_CART,
  payload: product
});

export const removeProductFromCart = productId => ({
  type: cartActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload: productId
});
