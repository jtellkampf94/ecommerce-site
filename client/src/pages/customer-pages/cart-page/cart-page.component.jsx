import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import uuid from "uuid/v1";

import {
  selectCartItems,
  selectCartSubtotalPrice
} from "../../../redux/cart/cart.selectors";
import {
  removeProductFromCart,
  addCartProductQuantity
} from "../../../redux/cart/cart.actions";

import CartPageItem from "../../../components/cart-page-item/cart-page-item.component";
import OrderSummary from "../../../components/order-summary/order-summary.component";

const CartPage = ({
  cartItems,
  cartSubtotalPrice,
  removeProductFromCart,
  addCartProductQuantity
}) => {
  return (
    <div>
      <h1>Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-page">
          <div className="cart-page-header">
            <div className="header-block"></div>
            <div className="header-block">Item</div>
            <div className="header-block">Size</div>
            <div className="header-block">Quantity</div>
            <div className="header-block">Price</div>
          </div>
          <div className="cart-page-body">
            {cartItems.map(item => (
              <CartPageItem
                key={uuid()}
                removeFromCart={removeProductFromCart}
                addCartQuantity={addCartProductQuantity}
                item={item}
              />
            ))}
          </div>
        </div>
      ) : (
        <h5>You have no items in cart</h5>
      )}
      <OrderSummary subtotal={cartSubtotalPrice} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartSubtotalPrice: selectCartSubtotalPrice
});

const mapDispatchToProps = dispatch => ({
  removeProductFromCart: product => dispatch(removeProductFromCart(product)),
  addCartProductQuantity: product => dispatch(addCartProductQuantity(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
