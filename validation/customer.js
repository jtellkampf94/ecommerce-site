const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validateCustomer = data => {
  let errors = {};
  let sanitizedData = {};

  let { firstName, lastName, email, dateOfBirth, gender } = data;

  firstName = !isEmpty(firstName) ? firstName : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  email = !isEmpty(email) ? email : "";
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
    sanitizedData.gender = gender;
    sanitizedData.dateOfBirth = dateOfBirth;
  }

  return { errors, isValid: isEmpty(errors), sanitizedData };
};
