import React from "react";

const CartPageItem = ({ item, removeFromCart, addCartQuantity }) => {
  const { name, imageUrl, size, quantity, price } = item;
  const overallPrice = price * quantity;
  return (
    <div>
      <div>
        <img src={imageUrl} alt={name} />
      </div>
      <div>{name}</div>
      <div>UK {isNaN(parseInt(size)) ? size.toUpperCase() : size}</div>
      <div>
        <button onClick={() => removeFromCart(item)}>-</button>
        {quantity}
        <button onClick={() => addCartQuantity(item)}>+</button>
      </div>
      <div>£{overallPrice.toFixed(2)}</div>
    </div>
  );
};

export default CartPageItem;
