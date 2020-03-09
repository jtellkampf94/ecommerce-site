import React from "react";

const OrderItem = ({ item }) => {
  return (
    <div>
      <img src={item.imageUrl} alt={item.name} />
      <div>{item.name}</div>
      <div>Size UK {item.size}</div>
      <div>Quantity: {item.quantity}</div>
      <div>£{item.price}</div>
    </div>
  );
};

export default OrderItem;
