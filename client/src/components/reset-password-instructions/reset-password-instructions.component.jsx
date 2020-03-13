import React from "react";

import Modal from "../modal/modal.component";

const ResetPasswordInstructions = ({ closeModal }) => {
  const renderContent = () => (
    <div>
      You should now recieve an email from us with a link to set a new password.
      Please do this within an hour or the link would expire. If link does
      expire click on the 'Forgot password?' link on the login page.
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
