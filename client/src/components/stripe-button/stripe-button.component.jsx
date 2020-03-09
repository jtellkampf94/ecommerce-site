import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import { processPaymentStart } from "../../redux/order/order.actions";

const StripeButton = ({
  subtotal,
  deliveryPrice,
  addressId,
  deliverySpeed,
  cartItems,
  processPayment
}) => {
  let deliveryCharge;
  deliveryPrice
    ? (deliveryCharge = parseFloat(deliveryPrice))
    : (deliveryCharge = 3.49);

  deliveryCharge === 3.49 && subtotal > 50
    ? (deliveryCharge = 0.0)
    : (deliveryCharge = deliveryCharge);

  let total;
  subtotal === 0 ? (total = 0) : (total = subtotal + deliveryCharge);

  const onToken = async token => {
    processPayment(token, cartItems, addressId, deliverySpeed);
  };

  return (
    <StripeCheckout
      stripeKey="pk_test_YcVnwz0wkGWKv61OnCLvdJIU00KvlyvcwQ"
      label="pay now"
      name="ecommerce-site"
      description={`Your total is £${total.toFixed(2)}`}
      token={onToken}
    >
      <button>PAY NOW</button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = dispatch => ({
  processPayment: (token, cartItems, addressId, deliverySpeed) =>
    dispatch(processPaymentStart(token, cartItems, addressId, deliverySpeed))
});

export default connect(null, mapDispatchToProps)(StripeButton);
