import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import customerReducer from "./customer/customer.reducer";
import adminReducer from "./admin/admin.reducer";
import productReducer from "./product/product.reducer";
import uiReducer from "./ui/ui.reducer";
import cartReducer from "./cart/cart.reducer";
import addressReducer from "./address/address.reducer";
import orderReducer from "./order/order.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"]
};

const rootReducer = combineReducers({
  customer: customerReducer,
  admin: adminReducer,
  product: productReducer,
  ui: uiReducer,
  cart: cartReducer,
  address: addressReducer,
  order: orderReducer
});

export default persistReducer(persistConfig, rootReducer);
