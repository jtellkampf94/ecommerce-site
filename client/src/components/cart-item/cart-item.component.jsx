import React from "react";

const CartItem = ({ item: { imageUrl, name, size, price } }) => {
  return (
    <div className="cart-item">
      {/* <img src={imageUrl} alt="" /> */}
      <div className="details">
        <span>{name}</span>
        <span>
          Size: UK {isNaN(parseInt(size)) ? size.toUpperCase() : size}
        </span>
        <span>{price}</span>
      </div>
    </div>
  );
};

export default CartItem;
