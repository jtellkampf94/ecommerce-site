import React, { useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import AccountDetails from "../../../components/account-details/account-details.component";
import EditAccountDetails from "../../../components/edit-account-details/edit-account-details.component";

import {
  selectCurrentCustomer,
  selectCustomerRegisterErrors
} from "../../../redux/customer/customer.selectors";
import { editCustomerDetailsStart } from "../../../redux/customer/customer.actions";

const AccountSettingsPage = ({
  currentCustomer,
  editAccountErrors,
  editCustomer
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
      {editAccountDetails
        ? currentCustomer && (
            <EditAccountDetails
              accountDetails={currentCustomer}
              editAccount={editCustomer}
              errors={editAccountErrors}
            />
          )
        : currentCustomer && <AccountDetails account={currentCustomer} />}

      <button onClick={handleClick}>
        {editAccountDetails ? "BACK" : "EDIT"}
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCustomer: selectCurrentCustomer,
  editAccountErrors: selectCustomerRegisterErrors
});

const mapDispatchToProps = dispatch => ({
  editCustomer: (customerId, customerdetails) =>
    dispatch(editCustomerDetailsStart(customerId, customerdetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsPage);
