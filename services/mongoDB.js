const mongoose = require("mongoose");

const keys = require("../config/keys");

// mongoose.set("useCreateIndex", true);
// mongoose.Promise = Promise;

mongoose
  .connect(keys.mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

module.exports.Admin = require("../models/Admin");
module.exports.Cart = require("../models/Cart");
module.exports.Customer = require("../models/Customer");
module.exports.CustomerAddress = require("../models/CustomerAddress");
module.exports.Order = require("../models/Order");
module.exports.Product = require("../models/Product");
