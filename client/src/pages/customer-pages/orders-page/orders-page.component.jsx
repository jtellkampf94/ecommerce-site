import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import OrdersPageItem from "../../../components/orders-page-item/orders-page-item.component";

import {
  selectOrders,
  selectOrderErrors
} from "../../../redux/order/order.selectors";
import { fetchOrdersStart } from "../../../redux/order/order.actions";

const OrdersPage = ({ orders, fetchOrders, errors }) => {
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <div className="my-orders">
      {errors.error && <b>{errors.error}</b>}
      {orders &&
        orders.map(order => <OrdersPageItem key={order._id} order={order} />)}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orders: selectOrders,
  errors: selectOrderErrors
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrdersStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
