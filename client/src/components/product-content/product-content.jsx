import React from "react";

import ProductCard from "../product-card/product-card.component";

const ProductContent = ({ products }) => {
  return (
    <div className="product-overview">
      {products
        ? products.map(({ _id, ...otherProductProps }) => (
            <ProductCard key={_id} {...otherProductProps} id={_id} />
          ))
        : null}
    </div>
  );
};

export default ProductContent;
