const Validator = require("validator");

const isEmpty = require("../utils/isEmpty");

module.exports = validateAddress = data => {
  let errors = {};
  let sanitizedData = {};

  let {
    firstName,
    lastName,
    addressFirstLine,
    townOrCity,
    county,
    postCode,
    email,
    phoneNumber
  } = data;

  firstName = !isEmpty(firstName) ? firstName : "";
  lastName = !isEmpty(lastName) ? lastName : "";
  addressFirstLine = !isEmpty(addressFirstLine) ? addressFirstLine : "";
  townOrCity = !isEmpty(townOrCity) ? townOrCity : "";
  county = !isEmpty(county) ? county : "";
  postCode = !isEmpty(postCode) ? postCode : "";
  email = !isEmpty(email) ? email : "";
  phoneNumber = !isEmpty(phoneNumber) ? phoneNumber : "";

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

  if (typeof addressFirstLine !== "string") {
    errors.addressFirstLine = "Please enter a valid first line of your address";
  } else {
    if (!Validator.isLength(addressFirstLine, { min: 2, max: 100 })) {
      errors.addressFirstLine =
        "The first line of your address must be between 2 and 100 characters";
    }

    if (Validator.isEmpty(addressFirstLine)) {
      errors.addressFirstLine = "Please enter the first line of your address";
    }
  }

  if (typeof townOrCity !== "string") {
    errors.townOrCity = "Please enter a valid town or city";
  } else {
    if (!Validator.isLength(townOrCity, { min: 2, max: 100 })) {
      errors.townOrCity = "Town or city must be between 2 and 100 characters";
    }

    if (Validator.isEmpty(townOrCity)) {
      errors.townOrCity = "Please enter the town or city of your address";
    }
  }

  if (typeof county !== "string") {
    errors.county = "Please enter a valid county";
  } else {
    if (
      !Validator.isEmpty(county) &&
      !Validator.isLength(county, { min: 2, max: 100 })
    ) {
      errors.county = "County must be between 2 and 100 characters";
    }
  }

  if (typeof postCode !== "string") {
    errors.postCode = "Please enter a valid post code";
  } else {
    if (!Validator.isLength(postCode, { min: 2, max: 12 })) {
      errors.postCode = "Post code must be between 4 and 12 characters";
    }

    if (!Validator.isPostalCode(postCode, "GB")) {
      errors.postCode = "Please enter a valid post code";
    }

    if (Validator.isEmpty(postCode)) {
      errors.postCode = "Please enter the post code of your address";
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

  if (typeof phoneNumber !== "string") {
    errors.phoneNumber = "Please enter valid phone number";
  } else {
    if (Validator.isEmpty(phoneNumber)) {
      errors.phoneNumber = "Please enter your phone number";
    } else {
      if (phoneNumber.startsWith("+44")) {
        phoneNumber = "0" + phoneNumber.slice(3);
      }

      if (phoneNumber.length !== 11 || !phoneNumber.startsWith("0")) {
        errors.phoneNumber = "Please enter valid phone number";
      }
    }
  }

  if (isEmpty(errors)) {
    sanitizedData.firstName = firstName;
    sanitizedData.lastName = lastName;
    sanitizedData.addressFirstLine = addressFirstLine;
    sanitizedData.townOrCity = townOrCity;
    sanitizedData.county = county;
    sanitizedData.postCode = postCode;
    sanitizedData.email = email;
    sanitizedData.phoneNumber = phoneNumber;
  }

  return { errors, isValid: isEmpty(errors), sanitizedData };
};
