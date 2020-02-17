import cartActionTypes from "./cart.types";

const INITIAL_STATE = {
  cart: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case cartActionTypes.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(product => product._id !== action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
