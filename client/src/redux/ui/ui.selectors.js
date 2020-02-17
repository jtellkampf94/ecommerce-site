import { createSelector } from "reselect";

const selectUi = state => state.ui;

export const selectViewModal = createSelector([selectUi], ui => ui.viewModal);

export const selectId = createSelector([selectUi], ui => ui.id);
