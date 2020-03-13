const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

const Customer = require("../models/Customer");
const keys = require("../config/keys");
const validateCustomer = require("../validation/customer");
const {
  validateEmail,
  validateToken,
  validatePasswordAndToken
} = require("../validation/resetPassword");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: keys.sendgridApiKey
    }
  })
);

exports.updateCustomer = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validateCustomer(req.body);

    if (!isValid) return res.status(422).json(errors);

    if (req.user._id !== req.params.customerId)
      return res
        .status(422)
        .json({ error: "You are not authorized to perform this operation" });

    const customer = await Customer.findById(req.params.customerId);

    if (!customer)
      return res
        .status(401)
        .json({ error: "There is no customer found with this ID" });

    let updatedCustomer = await Customer.updateOne(
      { _id: req.params.customerId },
      { $set: sanitizedData }
    );

    updatedCustomer = await Customer.findById(req.params.customerId);

    const {
      _id,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      createdAt,
      updatedAt
    } = updatedCustomer;

    const token = jwt.sign(
      {
        _id,
        firstName,
        lastName,
        email,
        gender,
        dateOfBirth,
        createdAt,
        updatedAt
      },
      keys.jwtSecretKey
    );
    return res.status(200).json({ updatedCustomer, token });
  } catch (err) {
    console.log(err);
    if (err.name === "CastError")
      return res
        .status(400)
        .json({ error: "No customer with this ID is found" });
    const error = new Error();
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    if (req.user._id !== req.params.customerId)
      return res
        .status(422)
        .json({ error: "You are not authorized to perform this operation" });

    const customer = await Customer.findById(req.params.customerId);

    if (!customer)
      return res
        .status(401)
        .json({ error: "There is no customer found with this ID" });

    await customer.remove();
    return res.status(200).json(customer);
  } catch (err) {
    console.log(err);
    if (err.name === "CastError")
      return res
        .status(400)
        .json({ error: "No customer with this ID is found" });
    const error = new Error();
    next(error);
  }
};

exports.resetPasswordRequest = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validateEmail(req.body);

    if (!isValid) return res.status(422).json(errors);

    const customer = await Customer.findOne(sanitizedData);

    if (!customer)
      return res
        .status(401)
        .json({ resetPasswordEmail: "No account with this email exists." });

    const buffer = await crypto.randomBytes(33);
    const token = buffer.toString("hex");

    customer.resetToken = token;
    customer.resetTokenExpiration = Date.now() + 3600000;
    await customer.save();

    await transporter.sendMail({
      to: customer.email,
      from: "ecommerce-site@shop.com",
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Click <a href="http://localhost:3000/password-reset/${token}">here</a> to set a new password.</p>
      `
    });

    res.status(200).json({
      passwordReset:
        "We have sent you an email that provides you a link to reset your password"
    });
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.validateResetToken = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validateToken(req.body);

    if (!isValid) return res.status(422).json(errors);

    const customer = await Customer.findOne({
      resetToken: sanitizedData.token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!customer)
      return res.status(403).json({
        token:
          "Token you have provided is expired or invalid. Please try again."
      });

    const fetchedCustomer = { ...customer };
    delete fetchedCustomer.password;
    return res.status(200).json(fetchedCustomer);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validatePasswordAndToken(
      req.body
    );

    if (!isValid) return res.status(422).json(errors);

    const customer = await Customer.findOne({
      resetToken: sanitizedData.token,
      resetTokenExpiration: { $gt: Date.now() }
    });

    if (!customer)
      return res.status(403).json({
        token:
          "Token you have provided is expired or invalid. Please try again."
      });

    customer.password = sanitizedData.password;
    await customer.save();

    const updatedCustomer = { ...customer };
    delete updatedCustomer.password;
    return res.status(200).json(updatedCustomer);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};
