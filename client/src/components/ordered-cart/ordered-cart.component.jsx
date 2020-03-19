import React from "react";
import { Link } from "react-router-dom";

import history from "../../utils/history";

const OrderedCart = ({ cartItem }) => {
  const { _id, imageUrl, name, price, quantity, size } = cartItem;
  return (
    <div>
      <img
        src={imageUrl}
        alt={name}
        onClick={() => history.push(`/products/product/${_id}`)}
      />
      <div>
        <Link to={`/products/product/${_id}`}>{name}</Link>
      </div>
      <div>£{price}</div>
      <div>Size UK {size}</div>
      <div>Quantity: {quantity}</div>
    </div>
  );
};

export default OrderedCart;
