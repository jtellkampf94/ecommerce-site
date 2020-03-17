import React, { useState } from "react";

import Modal from "../modal/modal.component";
import ErrorMessage from "../error-message/error-message.component";

const EditPassword = ({
  editPassword,
  errors,
  closeModal,
  customerId,
  successMessage
}) => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const { oldPassword, newPassword, confirmNewPassword } = passwords;

  const handleChange = e => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    editPassword(customerId, { ...passwords });
  };

  const renderContent = () => {
    return (
      <div>
        <h5>Requirements</h5>
        <ul>
          <li>Contain between 6-24 characters</li>
          <li>Contain at least 1 mixed case letter</li>
          <li>Contain at least 1 number</li>
          <li>Contain at least 1 symbol</li>
        </ul>
        <div>
          <div>
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={oldPassword}
              id="oldPassword"
              onChange={handleChange}
            />
            {errors.oldPassword && (
              <ErrorMessage message={errors.oldPassword} />
            )}
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              id="newPassword"
              onChange={handleChange}
            />
            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword} />
            )}
          </div>
          <div>
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              id="confirmNewPassword"
              onChange={handleChange}
            />
            {errors.confirmNewPassword && (
              <ErrorMessage message={errors.confirmNewPassword} />
            )}
            {successMessage.editPassword && (
              <div>
                <b>{successMessage.editPassword}</b>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderActions = () => {
    return (
      <div>
        {successMessage.editPassword ? (
          <button type="button" onClick={closeModal}>
            OK
          </button>
        ) : (
          <React.Fragment>
            <button type="button" onClick={handleSubmit}>
              SAVE
            </button>
            <button type="button" onClick={closeModal}>
              CANCEL
            </button>
          </React.Fragment>
        )}
      </div>
    );
  };
  return (
    <Modal
      title="Change Password"
      content={renderContent()}
      actions={renderActions()}
      onDismiss={closeModal}
    />
  );
};

export default EditPassword;
