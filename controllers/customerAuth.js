const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Customer = require("../models/Customer");

const validateCustomerRegister = require("../validation/customerRegister");
const validateLogin = require("../validation/login");
const keys = require("../config/keys");

exports.postRegister = async (req, res, next) => {
  const { isValid, errors, sanitizedData } = validateCustomerRegister(req.body);

  if (!isValid) return res.status(422).json(errors);

  try {
    const existingCustomer = await Customer.findOne({
      email: sanitizedData.email
    });

    if (existingCustomer)
      return res.status(422).json({
        email:
          "A member with this email already exists. Please use another email address"
      });
    const newCustomer = await Customer.create(sanitizedData);
    const { _id, firstName, lastName, email } = newCustomer;
    const token = jwt.sign(
      { _id, firstName, lastName, email },
      keys.jwtSecretKey
    );
    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    const error = new Error("Oops! Something went wrong with our servers");
    error.status = 500;
    next(error);
  }
};

exports.postLogin = async (req, res, next) => {
  const { isValid, errors, sanitizedData } = validateLogin(req.body);

  if (!isValid) return res.status(422).json(errors);

  try {
    const customer = await Customer.findOne({ email: sanitizedData.email });
    if (!customer)
      return res
        .status(422)
        .json({ emailOrPassword: "Your email or password is incorrect" });
    const isMatch = await bcrypt.compare(
      sanitizedData.password,
      customer.password
    );
    if (!isMatch)
      return res
        .status(422)
        .json({ emailOrPassword: "Your email or password is incorrect" });
    const { _id, firstName, lastName, email, gender, dateOfBirth } = customer;
    const token = jwt.sign(
      {
        _id,
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth
      },
      keys.jwtSecretKey
    );
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    const error = new Error("Oops! Something went wrong with our servers");
    error.status = 500;
    next(error);
  }
};
