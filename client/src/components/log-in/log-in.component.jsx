import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ErrorMessage from "../error-message/error-message.component";

const LogIn = ({ emailSignInStart, errors = {} }) => {
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
        <div className="buttons">
          <CustomButton type="submit"> Log in </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
