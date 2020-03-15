import React, { useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ErrorMessage from "../error-message/error-message.component";
import ResetPasswordModal from "../reset-password-modal/reset-password-modal.component";

import { closeModal, showModal } from "../../redux/ui/ui.actions";
import { selectViewModal } from "../../redux/ui/ui.selectors";
import { resetCustomerPasswordRequestStart } from "../../redux/customer/customer.actions";

const LogIn = ({
  customer,
  emailSignInStart,
  errors,
  closeModal,
  showModal,
  viewModal,
  resetPassword
}) => {
  const [credentials, setUserCredentials] = useState({
    email: "",
    password: ""
  });

  const { email, password } = credentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setUserCredentials({ ...credentials, [name]: value });
  };

  const handleEmailSubmit = e => {
    e.preventDefault();
    emailSignInStart(email, password);
  };

  return (
    <div className="log-in">
      <h2 className="log-in__title">Log In</h2>
      <span className="log-in__subtitle">
        Log in with your email and password
      </span>
      <form onSubmit={handleEmailSubmit} noValidate>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          required
        />
        {errors.email && <ErrorMessage message={errors.email} />}
        <FormInput
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          label="password"
          required
        />
        {errors.password && <ErrorMessage message={errors.password} />}
        {errors.emailOrPassword && (
          <ErrorMessage message={errors.emailOrPassword} />
        )}
        {customer && <div onClick={() => showModal()}>Forgot password?</div>}
        {viewModal && (
          <ResetPasswordModal
            resetPassword={resetPassword}
            errors={errors}
            closeModal={closeModal}
          />
        )}
        <div className="buttons">
          <CustomButton type="submit"> Log in </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  viewModal: selectViewModal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  showModal: () => dispatch(showModal()),
  resetPassword: email => dispatch(resetCustomerPasswordRequestStart(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
