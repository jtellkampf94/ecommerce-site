import { createSelector } from "reselect";

const selectAddress = state => state.address;

export const selectAddresses = createSelector(
  [selectAddress],
  address => address.addresses
);

export const selectCurrentAddress = createSelector(
  [selectAddress],
  address => address.selectedAddress
);

export const selectAddressErrors = createSelector(
  [selectAddress],
  address => address.error
);
