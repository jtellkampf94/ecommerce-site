import React from "react";

import AdminProductCard from "../admin-product-card/admin-product-card.component";

const ProductCollection = ({ products }) => {
  return (
    <div className="product-overview">
      {products
        ? products.map(({ _id, ...otherProductProps }) => (
            <AdminProductCard key={_id} {...otherProductProps} id={_id} />
          ))
        : null}
    </div>
  );
};

export default ProductCollection;
