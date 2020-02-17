import uiActionTypes from "./ui.types";

export const showModal = id => ({
  type: uiActionTypes.SHOW_MODAL,
  payload: id
});

export const closeModal = () => ({
  type: uiActionTypes.CLOSE_MODAL
});
