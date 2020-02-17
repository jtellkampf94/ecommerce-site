import { createSelector } from "reselect";

const selectAdmin = state => state.admin;

export const selectCurrentAdmin = createSelector(
  [selectAdmin],
  admin => admin.currentAdmin
);

export const selectAdminLoginErrors = createSelector(
  [selectAdmin],
  admin => admin.loginError
);

export const selectAdminRegisterErrors = createSelector(
  [selectAdmin],
  admin => admin.registerError
);
