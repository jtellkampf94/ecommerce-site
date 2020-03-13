const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

exports.validateEmail = data => {
  let errors = {};
  let sanitizedData = {};

  let { email } = data;

  email = !isEmpty(email) ? email : "";

  if (typeof email !== "string") {
    errors.resetPasswordEmail = "Please enter valid email";
  } else {
    if (!Validator.isEmail(email)) {
      errors.resetPasswordEmail = "Email is invalid";
    }

    if (Validator.isEmpty(email)) {
      errors.resetPasswordEmail = "Please enter your email";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.email = email;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    sanitizedData
  };
};

exports.validatePasswordAndToken = data => {
  let errors = {};
  let sanitizedData = {};

  const symbolRegex = /\W/;
  const numberRegex = /\d/;
  const capitalLetterRegex = /[A-Z]/;
  const lowerCaseLetterRegex = /[a-z]/;

  let { password, token } = data;

  password = !isEmpty(password) ? password : "";
  token = !isEmpty(token) ? token : "";

  if (typeof password !== "string") {
    errors.password = "Please enter valid password";
  } else {
    if (!symbolRegex.test(password)) {
      errors.password = "Password must contain at least 1 symbol";
    }

    if (!numberRegex.test(password)) {
      errors.password = "Password must contain at least 1 number";
    }

    if (!capitalLetterRegex.test(password)) {
      errors.password = "Password must contain at least 1 capital letter";
    }

    if (!lowerCaseLetterRegex.test(password)) {
      errors.password = "Password must contain at least 1 lower case letter";
    }

    if (!Validator.isLength(password, { min: 6, max: 24 })) {
      errors.password = "Password must be between 6 and 24 characters";
    }

    if (Validator.isEmpty(password)) {
      errors.password = "Please enter a password";
    }
  }

  if (typeof token !== "string") {
    errors.token = "Please enter valid token";
  } else {
    if (Validator.isEmpty(token)) {
      errors.token = "Please provide a token";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.password = password;
    sanitizedData.token = token;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    sanitizedData
  };
};

exports.validateToken = data => {
  let errors = {};
  let sanitizedData = {};

  let { token } = data;

  token = !isEmpty(token) ? token : "";

  if (typeof token !== "string") {
    errors.token = "Please enter valid token";
  } else {
    if (Validator.isEmpty(token)) {
      errors.token = "Please provide a token";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.token = token;
  }

  return {
    errors,
    isValid: isEmpty(errors),
    sanitizedData
  };
};
