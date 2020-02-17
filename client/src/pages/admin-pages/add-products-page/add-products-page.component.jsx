import React from "react";
import ProductForm from "../../../components/product-form/product-form.component";

const AddProduct = () => {
  return (
    <div>
      <h2 className="log-in__title">Product</h2>
      <span className="log-in__subtitle">
        Enter product you would like to include in the database
      </span>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
