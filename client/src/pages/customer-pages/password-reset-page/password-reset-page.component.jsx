import React, { useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import ErrorMessage from "../../../components/error-message/error-message.component";
import ResetPasswordForm from "../../../components/reset-password-form/reset-passord-form.component";

import {
  validateResetPasswordTokenStart,
  resetPasswordStart
} from "../../../redux/customer/customer.actions";
import { selectCustomerLoginErrors } from "../../../redux/customer/customer.selectors";

const PasswordResetPage = ({ match, validateToken, errors, resetPassword }) => {
  useEffect(() => {
    validateToken(match.params.token);
  }, [match.params.token]);
  return (
    <div>
      <h1>Reset Password</h1>
      {errors.token ? (
        <ErrorMessage message={errors.token} />
      ) : (
        <ResetPasswordForm
          errors={errors}
          token={match.params.token}
          resetPassword={resetPassword}
        />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  errors: selectCustomerLoginErrors
});

const mapDispatchToProps = dispatch => ({
  validateToken: token => dispatch(validateResetPasswordTokenStart(token)),
  resetPassword: (token, password, confirmPassword) =>
    dispatch(resetPasswordStart(token, password, confirmPassword))
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetPage);
