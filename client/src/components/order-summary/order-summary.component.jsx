import React from "react";

import history from "../../utils/history";

const OrderSummary = ({ subtotal, checkout }) => {
  const deliveryCharge = subtotal > 50 ? 0.0 : 3.49;
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
          Estimated Delivery & Handling <small>Free for orders over £50</small>{" "}
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
