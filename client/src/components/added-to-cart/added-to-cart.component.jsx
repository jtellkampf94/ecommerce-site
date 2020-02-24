import React from "react";
import { Link } from "react-router-dom";

import Modal from "../modal/modal.component";

const AddedToCart = ({ id, product, closeModal, size }) => {
  const renderContent = () => {
    return (
      <React.Fragment>
        <span>{product.name}</span>
        <span>Size UK {size}</span>
        {/* <img src={product.imageUrl} alt={product.name} /> */}
      </React.Fragment>
    );
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={closeModal}>Continue shopping</button>
        <Link to="/cart">
          <button>Go to checkout</button>
        </Link>
      </React.Fragment>
    );
  };

  return (
    <Modal
      title="Added to cart"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default AddedToCart;
