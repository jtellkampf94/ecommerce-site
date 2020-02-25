import React from "react";

import OrderSummary from "../../components/order-summary/order-summary.component";

const CheckoutPage = () => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <OrderSummary />
    </div>
  );
};

export default CheckoutPage;
