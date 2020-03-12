import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import LogInAndRegisterPage from "./pages/log-in-and-register-page/log-in-and-register-page.component";
import AdminLogInAndRegisterPage from "./pages/admin-pages/login-and-register-page/log-in-and-register-page.component";
import CategoryPage from "./pages/category-page/category-page.component";
import ProductPage from "./pages/product-page/product-page.component";
import CartPage from "./pages/customer-pages/cart-page/cart-page.component";
import CheckoutPage from "./pages/customer-pages/checkout-page/checkout-page.component";
import AccountSettingsPage from "./pages/customer-pages/account-settings-page/account-settings-page";
import OrdersPage from "./pages/customer-pages/orders-page/orders-page.component";
import OrderPage from "./pages/customer-pages/order-page/order-page.component";
import AddressesPage from "./pages/customer-pages/addresses-page/addresses-page.component";
import OrderSuccessPage from "./pages/customer-pages/order-success-page/order-success-page.component";
import PasswordResetPage from "./pages/customer-pages/password-reset-page/password-reset-page.component";
import Header from "./components/header/header.component";
import AdminProducts from "./pages/admin-pages/products-page/products-page.component";
import EditProduct from "./pages/admin-pages/edit-product/edit-product.component";
import AddProduct from "./pages/admin-pages/add-products-page/add-products-page.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";

import "./App.css";

import { checkAdminSignedIn } from "./redux/admin/admin.actions";
import { selectCurrentCustomer } from "./redux/customer/customer.selectors";
import { selectCurrentAdmin } from "./redux/admin/admin.selectors";
import { checkCustomerLoggedIn } from "./redux/customer/customer.actions";
import { selectCurrentOrder } from "./redux/order/order.selectors";

const App = ({
  checkAdminSignedIn,
  checkCustomerLoggedIn,
  currentCustomer,
  currentAdmin,
  currentOrder
}) => {
  useEffect(() => {
    checkAdminSignedIn();
    checkCustomerLoggedIn();
  }, [checkAdminSignedIn, checkCustomerLoggedIn]);
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/login"
          render={() =>
            currentCustomer ? <Redirect to="/" /> : <LogInAndRegisterPage />
          }
        />
        <Route exact path="/products/:category" component={CategoryPage} />
        <Route
          exact
          path="/products/product/:productId"
          component={ProductPage}
        />
        <Route exact path="/cart" component={CartPage} />
        <Route
          exact
          path="/password-reset/:token"
          component={PasswordResetPage}
        />
        <ProtectedRoute
          exact
          path="/checkout"
          component={CheckoutPage}
          customer
        />
        <ProtectedRoute
          exact
          path="/order-success"
          render={() =>
            currentOrder ? <OrderSuccessPage /> : <Redirect to="/checkout" />
          }
          customer
        />
        <ProtectedRoute
          exact
          path="/my-account/settings"
          component={AccountSettingsPage}
          customer
        />
        <ProtectedRoute
          exact
          path="/my-account/orders"
          component={OrdersPage}
          customer
        />
        <ProtectedRoute
          exact
          path="/my-account/orders/:orderId"
          component={OrderPage}
          customer
        />
        <ProtectedRoute
          exact
          path="/my-account/addresses"
          component={AddressesPage}
          customer
        />
        <Route
          exact
          path="/admin/login"
          render={() =>
            currentAdmin ? (
              <Redirect to="/admin/products" />
            ) : (
              <AdminLogInAndRegisterPage />
            )
          }
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          component={AdminProducts}
          admin
        />
        <ProtectedRoute
          exact
          path="/admin/add-product"
          component={AddProduct}
          admin
        />
        <ProtectedRoute
          exact
          path="/admin/products/:productId"
          component={EditProduct}
          admin
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCustomer: selectCurrentCustomer,
  currentAdmin: selectCurrentAdmin,
  currentOrder: selectCurrentOrder
});

const mapDispatchToProps = dispatch => ({
  checkAdminSignedIn: () => dispatch(checkAdminSignedIn()),
  checkCustomerLoggedIn: () => dispatch(checkCustomerLoggedIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
