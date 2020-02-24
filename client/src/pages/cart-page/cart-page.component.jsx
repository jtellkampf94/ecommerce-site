import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";

const CartPage = ({ cartItems }) => {
  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cartItems
            ? cartItems.map(item => (
                <tr key={item._id}>
                  <td>
                    <img src={item.imageUrl} alt={item.name} />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>1</td>
                </tr>
              ))
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
