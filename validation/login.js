const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validateLogin = data => {
  let errors = {};
  let sanitizedData = {};

  let { email, password } = data;

  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";

  if (typeof email !== "string") {
    errors.email = "Please enter valid email";
  } else {
    if (!Validator.isEmail(email)) {
      errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(email)) {
      errors.email = "Please enter your email";
    }
  }

  if (typeof password !== "string") {
    errors.password = "Please enter valid password";
  } else {
    if (Validator.isEmpty(password)) {
      errors.password = "Please enter a password";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.email = email;
    sanitizedData.password = password;
  }

  return { errors, isValid: isEmpty(errors), sanitizedData };
};
