const mongoose = require("mongoose");

const customerAddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    addressFirstLine: {
      type: String,
      required: true
    },
    townOrCity: {
      type: String,
      required: true
    },
    county: {
      type: String
    },
    postCode: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer"
    }
  },
  { timestamps: true }
);

const CustomerAddress = mongoose.model(
  "customerAddress",
  customerAddressSchema
);

module.exports = CustomerAddress;
