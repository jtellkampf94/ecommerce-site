import cartActionTypes from "./cart.types";
import {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQuantity,
  mapDeliveryPriceToSpeed
} from "./cart.utils";

const INITIAL_STATE = {
  cart: [],
  error: {},
  deliveryPrice: null,
  deliverySpeed: null,
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
    case cartActionTypes.ADD_CART_PRODUCT_QUANTITY_SUCCESS:
      return {
        ...state,
        error: {},
        cart: increaseCartItemQuantity(state.cart, action.payload)
      };
    case cartActionTypes.ADD_CART_PRODUCT_QUANTITY_FAILURE:
    case cartActionTypes.ADD_PRODUCT_TO_CART_FAILURE:
      return { ...state, error: action.payload };
    case cartActionTypes.TOGGLE_CART_HIDDEN:
      return { ...state, hidden: !state.hidden };
    case cartActionTypes.SET_DELIVERY_PRICE:
      return {
        ...state,
        deliveryPrice: action.payload,
        deliverySpeed: mapDeliveryPriceToSpeed(action.payload)
      };
    case cartActionTypes.CLEAR_CART:
      return {
        ...state,
        cart: [],
        error: {},
        deliveryPrice: null,
        deliverySpeed: null
      };
    default:
      return state;
  }
};

export default cartReducer;
