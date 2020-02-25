import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import CartPageItem from "../../components/cart-page-item/cart-page-item.component";

const CartPage = ({ cartItems }) => {
  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Size</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems
            ? cartItems.map(item => <CartPageItem key={item._id} item={item} />)
            : null}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartPage);
