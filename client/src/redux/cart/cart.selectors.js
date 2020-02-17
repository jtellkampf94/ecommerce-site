import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCurrentCustomer = createSelector(
  [selectCustomer],
  customer => customer.currentCustomer
);

export const selectCustomerErrors = createSelector(
  [selectCustomer],
  customer => customer.error
);
