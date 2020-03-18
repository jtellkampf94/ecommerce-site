import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

// todo address dropdown

const OrdersPageItem = ({ order }) => {
  return (
    <div>
      <div className="order-header">
        <div>
          Order Placed <Moment format="Do MMM YYYY">{order.createdAt}</Moment>
        </div>
        <div>Total £{order.total}</div>
        <div>
          Dispatched To {order.customerAddress.firstName}{" "}
          {order.customerAddress.lastName}
        </div>
        <div>
          <Link to={`/my-account/orders/${order._id}`}>Order Details</Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersPageItem;
