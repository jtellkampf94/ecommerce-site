const jwt = require("jsonwebtoken");

const Customer = require("../models/Customer");
const keys = require("../config/keys");
const validateCustomer = require("../validation/customer");

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

exports.resetPassword = async (req, res, next) => {};
