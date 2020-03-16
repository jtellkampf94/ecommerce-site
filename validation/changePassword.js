const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validatePasswords = data => {
  let errors = {};
  let sanitizedData = {};

  const symbolRegex = /\W/;
  const numberRegex = /\d/;
  const capitalLetterRegex = /[A-Z]/;
  const lowerCaseLetterRegex = /[a-z]/;

  let { oldPassword, newPassword } = data;

  oldPassword = !isEmpty(oldPassword) ? oldPassword : "";
  newPassword = !isEmpty(newPassword) ? newPassword : "";

  if (typeof oldPassword !== "string") {
    errors.oldPassword = "Please enter valid password";
  } else {
    if (!Validator.isLength(oldPassword, { min: 6, max: 24 })) {
      errors.oldPassword = "Password must be between 6 and 24 characters";
    }

    if (Validator.isEmpty(oldPassword)) {
      errors.oldPassword = "Please enter a password";
    }
  }

  if (typeof newPassword !== "string") {
    errors.newPassword = "Please enter valid password";
  } else {
    if (!symbolRegex.test(newPassword)) {
      errors.newPassword = "Password must contain at least 1 symbol";
    }

    if (!numberRegex.test(newPassword)) {
      errors.newPassword = "Password must contain at least 1 number";
    }

    if (!capitalLetterRegex.test(newPassword)) {
      errors.newPassword = "Password must contain at least 1 capital letter";
    }

    if (!lowerCaseLetterRegex.test(newPassword)) {
      errors.newPassword = "Password must contain at least 1 lower case letter";
    }

    if (!Validator.isLength(newPassword, { min: 6, max: 24 })) {
      errors.newPassword = "Password must be between 6 and 24 characters";
    }

    if (Validator.isEmpty(newPassword)) {
      errors.newPassword = "Please enter a password";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.newPassword = newPassword;
    sanitizedData.oldPassword = oldPassword;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    sanitizedData
  };
};
