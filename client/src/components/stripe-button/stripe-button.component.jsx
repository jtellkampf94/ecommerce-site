import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeButton = ({
  subtotal,
  deliveryPrice,
  addressId,
  deliverySpeed,
  cartItems
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
    try {
      const { data } = await axios.post("/api/payment", {
        token,
        cartItems,
        addressId,
        deliverySpeed
      });
      console.log("hit", data);
    } catch (err) {
      console.log(err);
    }
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

export default StripeButton;
