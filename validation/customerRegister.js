const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validateCustomerRegister = data => {
  let errors = {};
  let sanitizedData = {};

  const symbolRegex = /\W/;
  const numberRegex = /\d/;
  const capitalLetterRegex = /[A-Z]/;
  const lowerCaseLetterRegex = /[a-z]/;

  let { firstName, lastName, email, password, dateOfBirth, gender } = data;

  firstName = !isEmpty(firstName) ? firstName : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  dateOfBirth = !isEmpty(dateOfBirth) ? dateOfBirth : "";
  gender = !isEmpty(gender) ? gender : "";

  if (typeof firstName !== "string") {
    errors.firstName = "Please enter valid first name";
  } else {
    if (!Validator.isLength(firstName, { min: 2, max: 30 })) {
      errors.firstName = "First Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(firstName)) {
      errors.firstName = "Please enter your first name";
    }
  }

  if (typeof lastName !== "string") {
    errors.lastName = "Please enter valid last name";
  } else {
    if (!Validator.isLength(lastName, { min: 2, max: 30 })) {
      errors.lastName = "Last Name must be between 2 and 30 characters";
    }

    if (Validator.isEmpty(lastName)) {
      errors.lastName = "Please enter your last name";
    }
  }

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

  if (Validator.isEmpty(dateOfBirth)) {
    errors.dateOfBirth = "Please enter date of birth";
  } else {
    dateOfBirth = new Date(dateOfBirth);
    if (!(dateOfBirth instanceof Date)) {
      errors.dateOfBirth = "Please enter valid date of birth";
    }
  }

  if (typeof gender !== "string") {
    errors.gender = "Please enter your preference";
  } else {
    if (
      !(
        (gender !== "male" && gender === "female") ||
        (gender !== "female" && gender === "male")
      )
    ) {
      errors.gender = "Please enter your preference";
    }

    if (Validator.isEmpty(gender)) {
      errors.gender = "Please enter your preference";
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.firstName = firstName;
    sanitizedData.lastName = lastName;
    sanitizedData.email = email;
    sanitizedData.password = password;
    sanitizedData.gender = gender;
    sanitizedData.dateOfBirth = dateOfBirth;
  }

  return { errors, isValid: isEmpty(errors), sanitizedData };
};
