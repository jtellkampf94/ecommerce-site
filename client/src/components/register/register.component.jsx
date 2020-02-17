import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ErrorMessage from "../error-message/error-message.component";
import CheckboxSection from "../checkbox-section/checkbox-section.component";

import handleCheckboxChange from "../../utils/handleCheckboxChange";

const Register = ({ register, admin, errors = {} }) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: [],
    securityCode: ""
  });

  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    gender,
    securityCode
  } = credentials;

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const submitCredentials = { ...credentials };
    if (admin) {
      submitCredentials.dateOfBirth = new Date(submitCredentials.dateOfBirth);
      if (submitCredentials.gender.length === 1) {
        submitCredentials.gender = submitCredentials.gender[0];
        console.log(submitCredentials.gender);
      }
    }
    console.log(submitCredentials);

    register(submitCredentials);
  };

  return (
    <div className="register">
      <h2 className="register__title">Don't have an account?</h2>
      <span className="register__subtitle">
        Register with your email and password
      </span>
      <form className="register__form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          label="First Name"
        />
        {errors.firstName && <ErrorMessage message={errors.firstName} />}
        <FormInput
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          label="Last Name"
        />
        {errors.lastName && <ErrorMessage message={errors.lastName} />}
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
        />
        {errors.email && <ErrorMessage message={errors.email} />}
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
        />
        {errors.password && <ErrorMessage message={errors.password} />}
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword} />
        )}
        {admin && (
          <FormInput
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleChange}
            label="Date Of Birth"
          />
        )}
        {errors.dateOfBirth && <ErrorMessage message={errors.dateOfBirth} />}
        {admin && (
          <CheckboxSection
            state={credentials}
            handleChange={e =>
              handleCheckboxChange(
                e,
                gender,
                setCredentials,
                credentials,
                "gender"
              )
            }
            values={["male", "female"]}
            name="gender"
            title="Select your preference"
            text="Please select one"
          />
        )}
        {errors.gender && <ErrorMessage message={errors.gender} />}
        {admin && (
          <FormInput
            type="password"
            name="securityCode"
            value={securityCode}
            onChange={handleChange}
            label="Security Code"
          />
        )}
        {errors.securityCode && <ErrorMessage message={errors.securityCode} />}
        <CustomButton type="submit">REGISTER</CustomButton>
      </form>
    </div>
  );
};

export default Register;
