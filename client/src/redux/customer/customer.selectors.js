import { createSelector } from "reselect";

const selectCustomer = state => state.customer;

export const selectCurrentCustomer = createSelector(
  [selectCustomer],
  customer => customer.currentCustomer
);

export const selectCustomerLoginErrors = createSelector(
  [selectCustomer],
  customer => customer.loginError
);

export const selectCustomerRegisterErrors = createSelector(
  [selectCustomer],
  customer => customer.registerError
);

export const selectSuccessMessage = createSelector(
  [selectCustomer],
  customer => customer.successMessage
);
