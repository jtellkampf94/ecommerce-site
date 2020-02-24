import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchProductStart } from "../../redux/product/product.actions";
import { selectCurrentProduct } from "../../redux/product/product.selectors";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import { showModal, closeModal } from "../../redux/ui/ui.actions";
import { addProductToCart } from "../../redux/cart/cart.actions";

import AddedToCart from "../../components/added-to-cart/added-to-cart.component";

import "./product-page.styles.css";

const ProductPage = ({
  match,
  fetchProduct,
  product,
  showModal,
  closeModal,
  viewModal,
  addProductToCart
}) => {
  const [productDetails, setProductDetails] = useState({ prod: "", size: "" });

  const { prod, size } = productDetails;

  useEffect(() => {
    fetchProduct(match.params.productId);
  }, [match.params.productId]);

  useEffect(() => {
    if (product) {
      setProductDetails({ ...productDetails, prod: product });
    }
  }, [product]);

  const handleAddToCart = () => {
    addProductToCart(product);
    showModal();
  };

  const handleSetSize = e => {
    const selectedSize = e.target.getAttribute("name");
    if (size === selectedSize) {
      setProductDetails({ ...productDetails, size: "" });
    } else {
      setProductDetails({ ...productDetails, size: selectedSize });
    }
  };

  return (
    <div className="">
      {product && (
        <div>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} alt={product.name} />
          <p>{product.description}</p>
          <h5>£{product.price}</h5>
          <div className="size-section">
            {product.sizes.map(sizeElement => {
              const props = {
                className: `size-box ${parseInt(sizeElement.quantity) === 0 &&
                  "out-of-stock"} ${sizeElement.size === size &&
                  "size-selected"}`,
                name: sizeElement.size,
                ...(parseInt(sizeElement.quantity) > 0 && {
                  onClick: handleSetSize
                })
              };
              return (
                <span {...props}>
                  {isNaN(parseFloat(sizeElement.size))
                    ? sizeElement.size.toUpperCase()
                    : sizeElement.size}
                </span>
              );
            })}
          </div>
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      )}
      {viewModal && (
        <AddedToCart
          id={match.params.id}
          product={product}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct,
  viewModal: selectViewModal
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProductStart(productId)),
  closeModal: () => dispatch(closeModal()),
  showModal: id => dispatch(showModal(id)),
  addProductToCart: product => dispatch(addProductToCart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
