const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const keys = require("./config/keys");

require("./services/mongoDB");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const customerAuthRoutes = require("./routes/customerAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const productRoutes = require("./routes/productRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

app.use("/api/auth", customerAuthRoutes);
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

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
