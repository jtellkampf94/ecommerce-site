import React from "react";

const CartPageItem = ({ item: { _id, imageUrl, name, price, size } }) => {
  return (
    <tr>
      <td>
        <img src={imageUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>UK {isNaN(parseInt(size)) ? size.toUpperCase() : size}</td>
      <td>1</td>
      <td>£{price}</td>
    </tr>
  );
};

export default CartPageItem;
