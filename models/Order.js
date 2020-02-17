const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart"
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerAddress"
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    dateDeliveryDue: {
      type: Date,
      required: true
    },
    delivered: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
