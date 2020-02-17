import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ name, price, imageUrl, id }) => {
  return (
    <Link to={`/products/product/${id}`}>
      <div>
        <div className="image" />
        <div>
          <span>{name}</span>
          <span>£{price}</span>
          <img src={imageUrl} alt={`${name} image`} />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
