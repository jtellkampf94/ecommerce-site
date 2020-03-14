import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import AccountDetails from "../../../components/account-details/account-details.component";
import EditAccountDetails from "../../../components/edit-account-details/edit-account-details.component";
import DeleteAccount from "../../../components/delete-account/delete-account.component";

import {
  selectCurrentCustomer,
  selectCustomerRegisterErrors,
  selectCustomerLoginErrors
} from "../../../redux/customer/customer.selectors";
import {
  editCustomerDetailsStart,
  deleteAccountStart
} from "../../../redux/customer/customer.actions";
import { selectViewModal } from "../../../redux/ui/ui.selectors";
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
  deleteAccountErrors
}) => {
  const [editAccountDetails, toggleEditAccountDetails] = useState(false);

  useEffect(() => {
    toggleEditAccountDetails(!editAccountDetails);
  }, [currentCustomer]);

  const handleClick = () => {
    toggleEditAccountDetails(!editAccountDetails);
  };
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
            />
          ) : (
            <AccountDetails account={currentCustomer} />
          )}

          <button type="button" onClick={handleClick}>
            {editAccountDetails ? "BACK" : "EDIT"}
          </button>
          <button type="button" onClick={showModal}>
            DELETE ACCOUNT
          </button>
          {viewModal && (
            <DeleteAccount
              deleteAccount={() => deleteAccount(currentCustomer._id)}
              closeModal={closeModal}
            />
          )}
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
  viewModal: selectViewModal
});

const mapDispatchToProps = dispatch => ({
  editCustomer: (customerId, customerdetails) =>
    dispatch(editCustomerDetailsStart(customerId, customerdetails)),
  showModal: () => dispatch(showModal()),
  closeModal: () => dispatch(closeModal()),
  deleteAccount: customerId => dispatch(deleteAccountStart(customerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsPage);
