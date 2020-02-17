import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { fetchProductStart } from "../../redux/product/product.actions";
import { selectCurrentProduct } from "../../redux/product/product.selectors";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import { showModal, closeModal } from "../../redux/ui/ui.actions";
import { addProductToCart } from "../../redux/cart/cart.actions";

import AddedToCart from "../../components/added-to-cart/added-to-cart.component";

const ProductPage = ({
  match,
  fetchProduct,
  product,
  showModal,
  closeModal,
  viewModal,
  addProductToCart
}) => {
  useEffect(() => {
    fetchProduct(match.params.productId);
  }, [match.params.productId]);

  const handleAddToCart = () => {
    addProductToCart(product);
    showModal();
  };

  return (
    <div className="">
      {product && (
        <div>
          <h1>{product.name}</h1>
          <img src={product.imageUrl} alt={product.name} />
          <p>{product.description}</p>
          <h5>£{product.price}</h5>
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
