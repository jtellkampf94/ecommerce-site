import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import HighlightedContent from "../../components/highlighted-content/highlighted-content.component";
import ResetPasswordInstructions from "../../components/reset-password-instructions/reset-password-instructions.component";

import { showModal, closeModal } from "../../redux/ui/ui.actions";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import { selectCurrentCustomer } from "../../redux/customer/customer.selectors";
import { clearResetPasswordRequest } from "../../redux/customer/customer.actions";

const HomePage = ({
  currentCustomer,
  clearResetPasswordRequest,
  closeModal,
  viewModal
}) => {
  useEffect(() => {
    if (currentCustomer && currentCustomer.passwordReset) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!SS");
      clearResetPasswordRequest();
    }
  }, [currentCustomer]);

  return (
    <div className="home-page">
      {viewModal && <ResetPasswordInstructions closeModal={closeModal} />}
      <h1>I am the home page</h1>
      <HighlightedContent />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentCustomer: selectCurrentCustomer,
  viewModal: selectViewModal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  clearResetPasswordRequest: () => dispatch(clearResetPasswordRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
