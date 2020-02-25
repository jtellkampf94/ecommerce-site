import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import uuid from "uuid/v1";

import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";

import {
  selectCartItems,
  selectCartSubtotalPrice
} from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import history from "../../utils/history";

const CartDropdown = ({ cartItems, toggleCartHidden, cartSubtotalPrice }) => {
  return (
    <div className="cart-dropdown">
      {cartItems.length > 0 ? (
        cartItems.map(cartItem => (
          <CartDropdownItem key={uuid()} item={cartItem} />
        ))
      ) : (
        <span>Cart is empty</span>
      )}
      <span>Subtotal: £{cartSubtotalPrice.toFixed(2)}</span>
      <button
        onClick={() => {
          history.push("/cart");
          toggleCartHidden();
        }}
      >
        GO TO CART
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartSubtotalPrice: selectCartSubtotalPrice
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
