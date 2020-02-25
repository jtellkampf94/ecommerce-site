import cartActionTypes from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQuantity
} from "./cart.utils";

const INITIAL_STATE = {
  cart: [],
  error: {},
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        cart: addItemToCart(state.cart, action.payload),
        error: {}
      };
    case cartActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        error: {},
        cart: removeItemFromCart(state.cart, action.payload)
      };
    case cartActionTypes.ADD_CART_PRODUCT_QUANTITY:
      return {
        ...state,
        error: {},
        cart: increaseCartItemQuantity(state.cart, action.payload)
      };
    case cartActionTypes.ADD_PRODUCT_TO_CART_FAILURE:
      return { ...state, error: action.payload };
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    default:
      return state;
  }
};

export default cartReducer;
