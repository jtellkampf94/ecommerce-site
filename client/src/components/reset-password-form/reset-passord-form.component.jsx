import React, { useState } from "react";

import ErrorMessage from "../error-message/error-message.component";

const ResetPasswordForm = ({ resetPassword, token, errors }) => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: ""
  });

  const { password, confirmPassword } = passwords;

  const handleChange = e => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    resetPassword(token, password, confirmPassword);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          id="password"
          onChange={handleChange}
        />
        {errors.password && <ErrorMessage message={errors.password} />}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          id="confirmPassword"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <ErrorMessage message={errors.confirmPassword} />
        )}
      </div>
      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default ResetPasswordForm;
