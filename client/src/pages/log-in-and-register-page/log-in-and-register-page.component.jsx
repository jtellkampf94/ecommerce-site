import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Register from "../../components/register/register.component";
import LogIn from "../../components/log-in/log-in.component";

import { selectCustomerErrors } from "../../redux/customer/customer.selectors";
import { emailSignInStart } from "../../redux/customer/customer.actions";

const LogInAndRegisterPage = ({ emailSignInStart, customerErrors }) => {
  return (
    <div className="log-in-and-register">
      <LogIn emailSignInStart={emailSignInStart} errors={customerErrors} />
      <Register />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  customerErrors: selectCustomerErrors
});

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInAndRegisterPage);
