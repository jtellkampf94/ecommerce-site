const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

customerSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      return next();
    })
    .catch(err => {
      console.log(err);
      return next();
    });
});

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
