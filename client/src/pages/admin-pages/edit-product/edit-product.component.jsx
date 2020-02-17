import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCurrentProduct,
  selectProductErrors
} from "../../../redux/product/product.selectors";
import { fetchProductStart } from "../../../redux/product/product.actions";
import ProductForm from "../../../components/product-form/product-form.component";

const EditProduct = ({ fetchProduct, product, match, productErrors }) => {
  useEffect(() => {
    fetchProduct(match.params.productId);
  }, [fetchProduct]);
  return (
    <div>
      {product ? (
        <ProductForm product={product} productErrors={productErrors} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProductStart(productId))
});

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct,
  productErrors: selectProductErrors
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
