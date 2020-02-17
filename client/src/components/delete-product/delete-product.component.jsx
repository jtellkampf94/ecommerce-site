import React from "react";

import Modal from "../modal/modal.component";
import CustomButton from "../custom-button/custom-button.component";

const DeleteProduct = ({ deleteProduct, id, name, closeModal }) => {
  const handleDelete = () => {
    deleteProduct(id);
  };

  const renderActions = () => {
    return (
      <React.Fragment>
        <CustomButton onClick={handleDelete}>Delete</CustomButton>
        <CustomButton onClick={() => closeModal(id)}>Cancel</CustomButton>
      </React.Fragment>
    );
  };
  return (
    <Modal
      title="Delete product"
      content={`Are you sure you want to delete ${name} from the database.`}
      actions={renderActions()}
      onDismiss={() => closeModal(id)}
    />
  );
};

export default DeleteProduct;
