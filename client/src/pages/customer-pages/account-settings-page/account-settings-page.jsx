import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import AccountDetails from "../../../components/account-details/account-details.component";
import EditAccountDetails from "../../../components/edit-account-details/edit-account-details.component";
import DeleteAccount from "../../../components/delete-account/delete-account.component";

import {
  selectCurrentCustomer,
  selectCustomerRegisterErrors,
  selectCustomerLoginErrors,
  selectSuccessMessage
} from "../../../redux/customer/customer.selectors";
import {
  editCustomerDetailsStart,
  deleteAccountStart,
  editPasswordStart
} from "../../../redux/customer/customer.actions";
import { selectViewModal, selectId } from "../../../redux/ui/ui.selectors";
import { showModal, closeModal } from "../../../redux/ui/ui.actions";
import ErrorMessage from "../../../components/error-message/error-message.component";

const AccountSettingsPage = ({
  currentCustomer,
  editAccountErrors,
  editCustomer,
  viewModal,
  showModal,
  closeModal,
  deleteAccount,
  deleteAccountErrors,
  modalId,
  editPassword,
  successMessage
}) => {
  const [editAccountDetails, toggleEditAccountDetails] = useState(false);

  useEffect(() => {
    toggleEditAccountDetails(!editAccountDetails);
  }, [currentCustomer]);

  const handleClick = () => {
    toggleEditAccountDetails(!editAccountDetails);
  };

  const id = "deleteAccount";

  return (
    <div className="settings">
      <h1>Settings</h1>
      {currentCustomer && (
        <div>
          {editAccountDetails ? (
            <EditAccountDetails
              accountDetails={currentCustomer}
              editAccount={editCustomer}
              errors={editAccountErrors}
              showModal={showModal}
              closeModal={closeModal}
              viewModal={viewModal}
              editPassword={editPassword}
              successMessage={successMessage}
            />
          ) : (
            <AccountDetails account={currentCustomer} />
          )}

          <button type="button" onClick={handleClick}>
            {editAccountDetails ? "BACK" : "EDIT"}
          </button>
          <button type="button" onClick={() => showModal(id)}>
            DELETE ACCOUNT
          </button>
          {viewModal && modalId === id ? (
            <DeleteAccount
              deleteAccount={() => deleteAccount(currentCustomer._id)}
              closeModal={closeModal}
            />
          ) : null}
          {deleteAccountErrors.error && (
            <ErrorMessage message={deleteAccountErrors.error} />
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCustomer: selectCurrentCustomer,
  editAccountErrors: selectCustomerRegisterErrors,
  deleteAccountErrors: selectCustomerLoginErrors,
  viewModal: selectViewModal,
  modalId: selectId,
  successMessage: selectSuccessMessage
});

const mapDispatchToProps = dispatch => ({
  editCustomer: (customerId, customerdetails) =>
    dispatch(editCustomerDetailsStart(customerId, customerdetails)),
  showModal: id => dispatch(showModal(id)),
  closeModal: () => dispatch(closeModal()),
  deleteAccount: customerId => dispatch(deleteAccountStart(customerId)),
  editPassword: (customerId, passwords) =>
    dispatch(editPasswordStart(customerId, passwords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsPage);
