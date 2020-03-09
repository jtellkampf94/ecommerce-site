import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Moment from "react-moment";

import OrderItem from "../../../components/order-item/order-item.component";
import AddressDisplay from "../../../components/address-display/address-display.component";

import { selectCurrentOrder } from "../../../redux/order/order.selectors";
import history from "../../../utils/history";

const OrderSuccessPage = ({ currentOrder }) => {
  return (
    <div>
      {currentOrder && (
        <React.Fragment>
          <h1>Your Order Has Been Successfull</h1>
          <h5>Your Order</h5>
          {currentOrder.cart.cart.map(cartItem => (
            <OrderItem key={cartItem._id} item={cartItem} />
          ))}
          <h5>Delivered To</h5>
          <AddressDisplay address={currentOrder.customerAddress} />
          <h5>Order Details</h5>
          <p>
            Delivery Type: {currentOrder.deliverySpeed}
            Delivery Price: {currentOrder.deliveryPrice}
            <small>
              If delivery type is standard and subtotal exceeds £50 delivery
              price won't be included in your total
            </small>
            Estimated Delivery Date:
            <Moment format="Do MMM YYYY">{currentOrder.dateDeliveryDue}</Moment>
            Subtotal: £{currentOrder.subtotal}
            Total: £{currentOrder.total}
          </p>
          <button onClick={() => history.push("/")}>CONTINUE</button>
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentOrder: selectCurrentOrder
});

export default connect(mapStateToProps)(OrderSuccessPage);
