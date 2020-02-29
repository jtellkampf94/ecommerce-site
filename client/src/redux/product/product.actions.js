import ProductActionTypes from "./product.types";

//----------------------ADMIN-ACTIONS----------------------//

export const fetchProductsStart = (page, limit) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_START,
  payload: { page, limit }
});

export const fetchProductStart = productId => ({
  type: ProductActionTypes.FETCH_PRODUCT_START,
  payload: productId
});

export const fetchProductsByCategoryStart = (category, page, limit) => ({
  type: ProductActionTypes.FETCH_PRODUCTS_BY_CATEGORY_START,
  payload: { category, page, limit }
});

export const adminUpdateProductStart = (product, productId) => ({
  type: ProductActionTypes.ADMIN_UPDATE_PRODUCT_START,
  payload: { product, productId }
});

export const fetchProductsSuccess = products => ({
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchProductSuccess = product => ({
  type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
  payload: product
});

export const fetchProductsFailure = error => ({
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
  payload: error
});

export const adminUpdateProductFailure = error => ({
  type: ProductActionTypes.ADMIN_UPDATE_PRODUCT_FAILURE,
  payload: error
});

export const fetchProductFailure = error => ({
  type: ProductActionTypes.FETCH_PRODUCT_FAILURE,
  payload: error
});

export const addAdminProductStart = productInfo => ({
  type: ProductActionTypes.ADD_ADMIN_PRODUCT_START,
  payload: productInfo
});

export const addAdminProductFailure = error => ({
  type: ProductActionTypes.ADD_ADMIN_PRODUCT_FAILURE,
  payload: error
});

export const adminDeleteProductStart = productId => ({
  type: ProductActionTypes.ADMIN_DELETE_PRODUCT_START,
  payload: productId
});

export const adminDeleteProductFailure = error => ({
  type: ProductActionTypes.ADMIN_DELETE_PRODUCT_START,
  payload: error
});

//----------------------USER-ACTIONS----------------------//
