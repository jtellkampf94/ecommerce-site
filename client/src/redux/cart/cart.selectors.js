import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartErrors = createSelector(
  [selectCart],
  cart => cart.error
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItems = createSelector([selectCart], cart => cart.cart);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.length
);
