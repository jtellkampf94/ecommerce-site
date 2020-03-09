import { createSelector } from "reselect";

const selectOrder = state => state.order;

export const selectOrders = createSelector(
  [selectOrder],
  order => order.orders
);

export const selectCurrentOrder = createSelector(
  [selectOrder],
  order => order.currentOrder
);

export const selectOrderErrors = createSelector(
  [selectOrder],
  order => order.error
);
