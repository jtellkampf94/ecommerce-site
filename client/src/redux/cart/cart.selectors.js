import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartErrors = createSelector(
  [selectCart],
  cart => cart.error
);

export const selectCartItems = createSelector([selectCart], cart => cart.cart);
