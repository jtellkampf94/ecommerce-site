const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid/v1");

const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

require("./services/mongoDB");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const customerAuthRoutes = require("./routes/customerAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const customerAddressRoutes = require("./routes/customerAddressRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", customerAuthRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/addresses", customerAddressRoutes);
app.use("/api/payment", paymentRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message =
    error.message || "Oops! Something went wrong with our servers";
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
