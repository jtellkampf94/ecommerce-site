import React from "react";

import Modal from "../modal/modal.component";

const DeleteAccount = ({ deleteAccount, closeModal }) => {
  const renderActions = () => {
    return (
      <React.Fragment>
        <button onClick={deleteAccount}>Delete</button>
        <button onClick={closeModal}>Cancel</button>
      </React.Fragment>
    );
  };
  return (
    <Modal
      title="Delete Account"
      content="Are you sure you want to delete your account."
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default DeleteAccount;
