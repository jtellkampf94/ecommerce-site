const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Admin = require("../models/Admin");

const validateAdminRegister = require("../validation/adminRegister");
const validateLogin = require("../validation/login");
const keys = require("../config/keys");

exports.postRegisterAdmin = async (req, res, next) => {
  const {
    isValid,
    errors,
    sanitizedData,
    sanitizedSecurityCode
  } = validateAdminRegister(req.body);

  if (!isValid) return res.status(422).json(errors);

  try {
    const matchedSecurityCode = await bcrypt.compare(
      sanitizedSecurityCode,
      keys.securityCode
    );
    if (!matchedSecurityCode)
      return res.status(422).json({
        securityCode: "The security code you have entered is incorrect"
      });

    const existingAdmin = await Admin.findOne({ email: sanitizedData.email });
    if (existingAdmin)
      return res.status(422).json({
        email:
          "Admin with this email already exists. Please use another email address"
      });

    const newAdmin = await Admin.create(sanitizedData);
    const { _id, firstName, lastName, email, gender, dateOfBirth } = newAdmin;
    const token = jwt.sign(
      { _id, firstName, lastName, email, gender, dateOfBirth },
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

exports.postLoginAdmin = async (req, res, next) => {
  const { isValid, errors, sanitizedData } = validateLogin(req.body);

  if (!isValid) return res.status(422).json(errors);

  try {
    const admin = await Admin.findOne({ email: sanitizedData.email });
    if (!admin)
      return res
        .status(422)
        .json({ emailOrPassword: "Your email or password is incorrect" });

    const isMatch = await bcrypt.compare(
      sanitizedData.password,
      admin.password
    );
    if (!isMatch)
      return res
        .status(422)
        .json({ emailOrPassword: "Your email or password is incorrect" });

    const { _id, firstName, lastName, email, gender, dateOfBirth } = admin;
    const token = jwt.sign(
      { _id, firstName, lastName, email, gender, dateOfBirth },
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
