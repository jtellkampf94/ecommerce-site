import { createSelector } from "reselect";

const selectCustomer = state => state.customer;

export const selectCurrentCustomer = createSelector(
  [selectCustomer],
  customer => customer.currentCustomer
);

export const selectCustomerErrors = createSelector(
  [selectCustomer],
  customer => customer.error
);
