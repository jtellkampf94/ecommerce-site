import React, { useState } from "react";

import Modal from "../modal/modal.component";
import ErrorMessage from "../error-message/error-message.component";

const ResetPasswordModal = ({ closeModal, errors, resetPassword }) => {
  const [email, setEmail] = useState("");

  const handleChange = e => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword(email);
  };
  const renderActions = () => (
    <React.Fragment>
      <label htmlFor="email"></label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={handleChange}
      />
      {errors.resetPasswordEmail && (
        <ErrorMessage message={errors.resetPasswordEmail} />
      )}
      <div>
        <button type="button" onClick={handleSubmit}>
          SUBMIT
        </button>
        <button type="button" onClick={closeModal}>
          CANCEL
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal
      title="Reset Password"
      content="Please enter your email"
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default ResetPasswordModal;
