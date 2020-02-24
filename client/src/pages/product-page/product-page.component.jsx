import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchProductStart } from "../../redux/product/product.actions";
import { selectCurrentProduct } from "../../redux/product/product.selectors";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import { showModal, closeModal } from "../../redux/ui/ui.actions";
import { addProductToCartStart } from "../../redux/cart/cart.actions";
import { selectCartErrors } from "../../redux/cart/cart.selectors";

import AddedToCart from "../../components/added-to-cart/added-to-cart.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import "./product-page.styles.css";

const ProductPage = ({
  match,
  fetchProduct,
  product,
  showModal,
  closeModal,
  viewModal,
  addProductToCart,
  cartErrors = {}
}) => {
  const [productSize, setProductSize] = useState({ size: "" });

  const { size } = productSize;

  useEffect(() => {
    fetchProduct(match.params.productId);
  }, [match.params.productId]);

  const handleAddToCart = () => {
    const productDetailsForCart = {
      _id: product._id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      size
    };
    addProductToCart(productDetailsForCart);
    showModal();
  };

  const handleSetSize = e => {
    const selectedSize = e.target.getAttribute("name");
    if (size === selectedSize) {
      setProductSize({ size: "" });
    } else {
      setProductSize({ size: selectedSize });
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
                key: sizeElement._id,
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
          {cartErrors.size && <ErrorMessage message={cartErrors.size} />}
          <button onClick={handleAddToCart}>Add to cart</button>
        </div>
      )}
      {viewModal && Object.entries(cartErrors).length === 0 ? (
        <AddedToCart
          id={match.params.id}
          product={product}
          size={size}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  product: selectCurrentProduct,
  viewModal: selectViewModal,
  cartErrors: selectCartErrors
});

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProductStart(productId)),
  closeModal: () => dispatch(closeModal()),
  showModal: id => dispatch(showModal(id)),
  addProductToCart: product => dispatch(addProductToCartStart(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
