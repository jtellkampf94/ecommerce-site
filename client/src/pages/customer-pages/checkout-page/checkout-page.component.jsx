import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import OrderSummary from "../../../components/order-summary/order-summary.component";
import AddressForm from "../../../components/address-form/address-form.component";
import AddressDisplay from "../../../components/address-display/address-display.component";

import { selectCartSubtotalPrice } from "../../../redux/cart/cart.selectors";

const CheckoutPage = ({ cartSubtotal }) => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <OrderSummary subtotal={cartSubtotal} checkout />
      <div>
        <h5>Shipping</h5>
        {/* <AddressForm /> */}
        <AddressDisplay />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartSubtotal: selectCartSubtotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);
