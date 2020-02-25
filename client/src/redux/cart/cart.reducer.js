import cartActionTypes from "./cart.types";

const INITIAL_STATE = {
  cart: [],
  error: {},
  hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT_TO_CART_SUCCESS:
      return { ...state, cart: [...state.cart, action.payload], error: {} };
    case cartActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product._id !== action.payload)
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
