import React from "react";

import ErrorMessage from "../error-message/error-message.component";

const CartPageItem = ({ item, removeFromCart, addCartQuantity, errors }) => {
  const { _id, name, imageUrl, size, quantity, price } = item;
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
        <button
          disabled={
            errors.cartQuantityIncrement &&
            errors.productId === _id &&
            errors.size === size
              ? true
              : false
          }
          onClick={() => addCartQuantity(_id, item, quantity, size)}
        >
          +
        </button>
        {errors.cartQuantityIncrement &&
        errors.productId === _id &&
        errors.size === size ? (
          <ErrorMessage message={errors.cartQuantityIncrement} />
        ) : null}
      </div>
      <div>£{overallPrice.toFixed(2)}</div>
    </div>
  );
};

export default CartPageItem;
