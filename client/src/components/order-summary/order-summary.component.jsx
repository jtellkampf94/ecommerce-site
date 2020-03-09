import React from "react";

import history from "../../utils/history";

const OrderSummary = ({ subtotal, checkout, deliveryPrice }) => {
  let deliveryCharge;
  deliveryPrice
    ? (deliveryCharge = parseFloat(deliveryPrice))
    : (deliveryCharge = 3.49);

  deliveryCharge === 3.49 && subtotal > 50
    ? (deliveryCharge = 0.0)
    : (deliveryCharge = deliveryCharge);

  let total;
  subtotal === 0 ? (total = 0) : (total = subtotal + deliveryCharge);

  return (
    <div className="summary">
      <div className="summary-header">
        <h5>Summary</h5>
      </div>
      <div className="summary-body">
        <div>
          Subtotal <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div>
          Delivery Charge
          <span>£{deliveryCharge}</span>
        </div>
      </div>
      <div className="summary-footer">
        <div>
          Total <span>£{total.toFixed(2)}</span>
        </div>
        {!checkout && (
          <div>
            <button onClick={() => history.push("/checkout")}>
              CONTINUE TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
