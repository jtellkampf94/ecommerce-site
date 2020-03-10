import React from "react";

const OrderItem = ({ item }) => {
  const { name, imageUrl, size, quantity, price } = item;
  return (
    <div>
      <img src={imageUrl} alt={name} />
      <div>{name}</div>
      <div>Size UK {isNaN(parseFloat(size)) ? size.toUpperCase() : size}</div>
      <div>Quantity: {quantity}</div>
      <div>£{price}</div>
    </div>
  );
};

export default OrderItem;
