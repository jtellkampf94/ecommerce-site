import { createSelector } from "reselect";

const selectProduct = state => state.product;

export const selectProducts = createSelector(
  [selectProduct],
  product => product.products
);

export const selectCurrentProduct = createSelector(
  [selectProduct],
  product => product.selectedProduct
);

export const selectProductErrors = createSelector(
  [selectProduct],
  product => product.error
);
