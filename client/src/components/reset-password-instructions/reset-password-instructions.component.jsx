import React from "react";

import Modal from "../modal/modal.component";

const ResetPasswordInstructions = ({ closeModal }) => {
  const renderContent = () => (
    <div>
      You should now recieve an email from us with a link to set a new password,
      within this link contains a token. Please click on link to reset password.
      Do this within an hour or the token in the link would expire. If the link
      does expire, restart the reset password process by clicking on the 'Forgot
      password?' link on the login page.
    </div>
  );

  const renderActions = () => <button onClick={closeModal}>OK</button>;

  return (
    <Modal
      title="Reset Password"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default ResetPasswordInstructions;
