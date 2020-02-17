import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import HomePage from "./pages/homepage/homepage.component";
import LogInAndRegisterPage from "./pages/log-in-and-register-page/log-in-and-register-page.component";
import AdminLogInAndRegisterPage from "./pages/admin-pages/login-and-register-page/log-in-and-register-page.component";
import CategoryPage from "./pages/category-page/category-page.component";
import ProductPage from "./pages/product-page/product-page.component";
import CheckoutPage from "./pages/checkout-page/checkout-page.component";
import Header from "./components/header/header.component";
import AdminProducts from "./pages/admin-pages/products-page/products-page.component";
import EditProduct from "./pages/admin-pages/edit-product/edit-product.component";
import AddProduct from "./pages/admin-pages/add-products-page/add-products-page.component";
import ProtectedRoute from "./components/protected-route/protected-route.component";

import "./App.css";

import { checkAdminSignedIn } from "./redux/admin/admin.actions";
import { selectCurrentCustomer } from "./redux/customer/customer.selectors";
import { selectCurrentAdmin } from "./redux/admin/admin.selectors";
import { adminUpdateProductFailure } from "./redux/product/product.actions";

const App = ({ checkAdminSignedIn, currentCustomer, currentAdmin }) => {
  useEffect(() => {
    checkAdminSignedIn();
  }, [checkAdminSignedIn]);
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
        <Route exact path="/checkout" component={CheckoutPage} />
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
  currentAdmin: selectCurrentAdmin
});

const mapDispatchToProps = dispatch => ({
  checkAdminSignedIn: () => dispatch(checkAdminSignedIn())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
