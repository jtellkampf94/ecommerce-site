import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.css";

const CartIcon = ({ toggleCartHidden, cartItemsCount }) => {
  return (
    <div className="cart-icon" onClick={toggleCartHidden}>
      <h5>CART</h5>
      <p>{cartItemsCount}</p>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItemsCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
