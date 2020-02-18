import { takeLatest, put, all, call } from "redux-saga/effects";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import history from "../../utils/history";

import ProductActionTypes from "./product.types";
import {
  fetchProductsSuccess,
  fetchProductSuccess,
  fetchProductsFailure,
  fetchProductFailure,
  addAdminProductFailure,
  fetchProductsStart,
  adminDeleteProductFailure,
  adminUpdateProductFailure
} from "./product.actions";

//--------------WORKER-GENERATORS--------------//

export function* fetchProducts({ payload }) {
  try {
    const { data: products } = yield axios.get(
      `/api/products?page=${payload.page}&limit=${payload.limit}`
    );
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* fetchProductsByCategory({ payload }) {
  try {
    const { data: products } = yield axios.get(
      `/api/products/${payload.category}?page=${payload.page}&limit=${payload.limit}`
    );
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error));
  }
}

export function* fetchProduct({ payload: productId }) {
  try {
    const { data: product } = yield axios.get(
      `/api/products/product/${productId}`
    );
    yield put(fetchProductSuccess(product));
  } catch (error) {
    yield put(fetchProductFailure(error));
  }
}

export function* addProduct({ payload: productInfo }) {
  try {
    const { data } = yield axios.get("/api/upload");
    const imageUrl = `https://jt-ecommerce-bucket.s3.eu-west-2.amazonaws.com/${data.key}`;
    const product = { ...productInfo, imageUrl };
    delete product.file;

    if (!productInfo.file) {
      yield put(
        addAdminProductFailure({
          imageUrl: "Please include an image of the product"
        })
      );
    } else {
      yield axios.post("/api/products", product);

      delete axios.defaults.headers.common["Authorization"];
      yield axios.put(data.url, productInfo.file, {
        headers: {
          "Content-Type": productInfo.file.type
        }
      });
      const token = localStorage.getItem("adminJwtToken");
      setAuthToken(token);
      yield put(fetchProductsStart(1, 8));
      history.push("/admin/products");
    }
  } catch (error) {
    yield put(addAdminProductFailure(error.response.data));
  }
}

export function* adminDeleteProduct({ payload: productId }) {
  try {
    yield axios.delete(`/api/products/product/${productId}`);
    yield put(fetchProductsStart(1, 8));
    history.push("/admin/products");
  } catch (error) {
    yield put(adminDeleteProductFailure(error));
  }
}

export function* adminUpdateProduct({ payload }) {
  try {
    if (payload.product.file) {
      const { data } = yield axios.get("/api/upload");
      const imageUrl = `https://jt-ecommerce-bucket.s3.eu-west-2.amazonaws.com/${data.key}`;
      const product = { ...payload.product, imageUrl };
      delete product.file;
      delete axios.defaults.headers.common["Authorization"];
      yield axios.put(data.url, payload.product.file, {
        headers: {
          "Content-Type": payload.product.file.type
        }
      });
      const token = localStorage.getItem("adminJwtToken");
      setAuthToken(token);

      yield axios.put(`/api/products/product/${payload.productId}`, product);
      yield put(fetchProductsStart(1, 8));
      history.push("/admin/products");
    } else {
      const product = { ...payload.product };
      delete product.file;
      yield axios.put(`/api/products/product/${payload.productId}`, product);
      yield put(fetchProductsStart(1, 8));
      history.push("/admin/products");
    }
  } catch (error) {
    yield put(adminUpdateProductFailure(error.response.data));
  }
}

//--------------WATCHER-GENERATORS--------------//

export function* onFetchProductStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* onFetchProductsStart() {
  yield takeLatest(ProductActionTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* onAddAdminProductStart() {
  yield takeLatest(ProductActionTypes.ADD_ADMIN_PRODUCT_START, addProduct);
}

export function* onAdminDeleteProductStart() {
  yield takeLatest(
    ProductActionTypes.ADMIN_DELETE_PRODUCT_START,
    adminDeleteProduct
  );
}

export function* onAdminUpdateProductStart() {
  yield takeLatest(
    ProductActionTypes.ADMIN_UPDATE_PRODUCT_START,
    adminUpdateProduct
  );
}

export function* onFetchProductsByCategoryStart() {
  yield takeLatest(
    ProductActionTypes.FETCH_PRODUCTS_BY_CATEGORY_START,
    fetchProductsByCategory
  );
}

export function* productSagas() {
  yield all([
    call(onAddAdminProductStart),
    call(onFetchProductsStart),
    call(onFetchProductsByCategoryStart),
    call(onFetchProductStart),
    call(onAdminDeleteProductStart),
    call(onAdminUpdateProductStart)
  ]);
}
