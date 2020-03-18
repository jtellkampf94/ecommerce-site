const CustomerAddress = require("../models/CustomerAddress");

const validateAddress = require("../validation/customerAddress");

exports.getCustomerAddresses = async (req, res, next) => {
  try {
    const addresses = await CustomerAddress.find({ customerId: req.user._id });
    res.status(200).json(addresses);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.getCustomerAddress = async (req, res, next) => {
  try {
    const address = await CustomerAddress.findById(req.params.addressId);
    if (!address)
      return res
        .status(400)
        .json({ error: "No address with this ID was found" });

    if (address.customerId.toString() !== req.user._id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view this address" });
    }

    res.status(200).json(address);
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No address with this ID was found" });
    const error = new Error();
    next(error);
  }
};

exports.postCustomerAddress = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validateAddress(req.body);

    if (!isValid) return res.status(422).json(errors);

    sanitizedData.customerId = req.user._id;

    const address = await CustomerAddress.create(sanitizedData);
    return res.status(201).json(address);
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.updateCustomerAddress = async (req, res, next) => {
  try {
    const { isValid, errors, sanitizedData } = validateAddress(req.body);

    if (!isValid) return res.status(422).json(errors);

    const address = await CustomerAddress.findById(req.params.addressId);

    if (!address)
      return res
        .status(401)
        .json({ error: "There is no address found with this ID" });

    if (address.customerId.toString() !== req.user._id)
      return res
        .status(403)
        .json({ error: "You are not authorized to update this address" });

    let updatedAddress = await CustomerAddress.updateOne(
      { _id: req.params.addressId },
      sanitizedData
    );
    updatedAddress = await CustomerAddress.findById(req.params.addressId);
    return res.status(200).json(updatedAddress);
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No address with this ID was found" });
    const error = new Error();
    next(error);
  }
};

exports.deleteCustomerAddress = async (req, res, next) => {
  try {
    const address = await CustomerAddress.findById(req.params.addressId);

    if (!address)
      return res
        .status(401)
        .json({ error: "There is no address found with this ID" });

    if (address.customerId.toString() !== req.user._id)
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this address" });

    await address.remove();
    return res.status(200).json(address);
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res
        .status(400)
        .json({ error: "No address with this ID was found" });
    const error = new Error();
    next(error);
  }
};
