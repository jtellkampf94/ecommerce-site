import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Register from "../../components/register/register.component";
import LogIn from "../../components/log-in/log-in.component";

import {
  selectCustomerLoginErrors,
  selectCustomerRegisterErrors
} from "../../redux/customer/customer.selectors";
import {
  emailSignInStart,
  customerRegisterStart
} from "../../redux/customer/customer.actions";

const LogInAndRegisterPage = ({
  emailSignInStart,
  register,
  customerLoginErrors,
  customerRegisterErrors
}) => {
  return (
    <div className="log-in-and-register">
      <h1>Join or login and continue</h1>
      <LogIn emailSignInStart={emailSignInStart} errors={customerLoginErrors} />
      <Register register={register} errors={customerRegisterErrors} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  customerLoginErrors: selectCustomerLoginErrors,
  customerRegisterErrors: selectCustomerRegisterErrors
});

const mapDispatchToProps = dispatch => ({
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
  register: credentials => dispatch(customerRegisterStart(credentials))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInAndRegisterPage);
