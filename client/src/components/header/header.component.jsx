import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCurrentCustomer } from "../../redux/customer/customer.selectors";
import { signOutStart } from "../../redux/customer/customer.actions";
import { selectCurrentAdmin } from "../../redux/admin/admin.selectors";
import { adminSignOutStart } from "../../redux/admin/admin.actions";

const Header = ({
  currentCustomer,
  currentAdmin,
  signOutStart,
  adminSignOutStart
}) => {
  return (
    <nav>
      <div className="container">
        <div className="header__logo-container">{/* <Logo /> */}</div>
        <div className="header__navigation">
          <a href="/" className="header__nav-link">
            SHOP
          </a>
          <Link to="/products/mens" className="header__nav-link">
            MENS
          </Link>
          <Link to="/products/womens" className="header__nav-link">
            WOMENS
          </Link>
          <Link to="/products/trainers" className="header__nav-link">
            TRAINERS
          </Link>
          <Link to="/products/hats" className="header__nav-link">
            HATS
          </Link>
          <Link to="/products/clothing" className="header__nav-link">
            CLOTHING
          </Link>
          <Link to="/products/gym&training" className="header__nav-link">
            GYM & TRAINING
          </Link>
          <Link to="/products/running" className="header__nav-link">
            RUNNING
          </Link>
          <a href="/" className="header__nav-link">
            CART
          </a>
          {currentCustomer ? (
            <Link to="/" onClick={signOutStart}>
              SIGN OUT
            </Link>
          ) : (
            <Link to="/login">LOG IN</Link>
          )}

          {currentAdmin ? (
            <React.Fragment>
              <Link to="/admin/products">ADMIN DASHBOARD</Link>
              <span onClick={adminSignOutStart}>ADMIN SIGN OUT</span>
            </React.Fragment>
          ) : (
            <Link to="/admin/login">ADMIN LOG IN</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCustomer: selectCurrentCustomer,
  currentAdmin: selectCurrentAdmin
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
  adminSignOutStart: () => dispatch(adminSignOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
