const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
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

adminSchema.pre("save", function(next) {
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

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
