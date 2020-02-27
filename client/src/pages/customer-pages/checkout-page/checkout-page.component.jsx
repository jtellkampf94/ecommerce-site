import React from "react";

import AddressDetails from "../../../components/address-details/address-details.component";

const CheckoutPage = () => {
  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <AddressDetails />
      {/* <OrderSummary /> */}
    </div>
  );
};

export default CheckoutPage;
