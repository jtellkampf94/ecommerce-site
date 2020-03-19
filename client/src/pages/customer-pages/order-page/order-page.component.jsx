import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Moment from "react-moment";

import AddressDisplay from "../../../components/address-display/address-display.component";
import OrderedCart from "../../../components/ordered-cart/ordered-cart.component";

import {
  selectCurrentOrder,
  selectOrderErrors
} from "../../../redux/order/order.selectors";
import { fetchOrderStart } from "../../../redux/order/order.actions";

const OrderPage = ({ order, fetchOrder, match, errors }) => {
  useEffect(() => {
    fetchOrder(match.params.orderId);
  }, [match.params.orderId]);

  return (
    <div className="order">
      <h1>Order Details</h1>
      {errors.error && <b>{errors.error}</b>}
      {order && (
        <div>
          <div>
            Ordered on <Moment format="Mo MMM YYYY">{order.createdAt}</Moment>{" "}
            <small>Order ID: {order._id}</small>
          </div>
          <div>
            <h5>Delivery Address</h5>
            <AddressDisplay address={order.customerAddress} />
            <h5>Order Summary</h5>
            Subtotal: £{order.subtotal}
            <br />
            Postage & Packaging: £{order.deliveryPrice}
            <br />
            <b>Total: £{order.total}</b>
          </div>
          <div>
            {order.cart.cart.map(cartItem => (
              <OrderedCart key={cartItem._id} cartItem={cartItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  order: selectCurrentOrder,
  errors: selectOrderErrors
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: orderId => dispatch(fetchOrderStart(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
