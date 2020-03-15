import React from "react";

import Modal from "../modal/modal.component";

const DeleteProduct = ({ editPassword, closeModal }) => {
  const renderActions = () => {
    return (
      <React.Fragment>
        <button type="button" onClick={editPassword}>
          Save
        </button>
        <button type="button" onClick={closeModal}>
          Cancel
        </button>
      </React.Fragment>
    );
  };
  return (
    <Modal
      title="Change Password"
      content=""
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default DeleteProduct;
