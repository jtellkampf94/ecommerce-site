import uiActionTypes from "./ui.types";

const INITIAL_STATE = {
  viewModal: false,
  id: null
};

const uiReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uiActionTypes.SHOW_MODAL:
      return {
        ...state,
        viewModal: true,
        id: action.payload
      };
    case uiActionTypes.CLOSE_MODAL:
      return { ...state, viewModal: false, id: null };
    default:
      return state;
  }
};

export default uiReducer;
