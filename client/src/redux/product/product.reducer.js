import ProductActionTypes from "./product.types";

const INITIAL_STATE = {
  products: null,
  selectedProduct: null,
  error: {}
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        selectedProduct: null,
        error: {}
      };
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
    case ProductActionTypes.ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: null,
        selectedProduct: action.payload,
        error: {}
      };
    case ProductActionTypes.FETCH_PRODUCT_FAILURE:
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
    case ProductActionTypes.ADD_ADMIN_PRODUCT_FAILURE:
    case ProductActionTypes.ADMIN_DELETE_PRODUCT_FAILURE:
    case ProductActionTypes.ADMIN_UPDATE_PRODUCT_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default productReducer;
