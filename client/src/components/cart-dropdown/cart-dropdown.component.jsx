import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import history from "../../utils/history";

const CartDropdown = ({ cartItems, toggleCartHidden }) => {
  return (
    <div className="cart-dropdown">
      {cartItems.length > 0 ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem._id} item={cartItem} />
        ))
      ) : (
        <span>Cart is empty</span>
      )}
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
  cartItems: selectCartItems
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
