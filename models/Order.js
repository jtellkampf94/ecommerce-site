const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart"
    },
    customerAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customerAddress"
    },
    deliveryPrice: {
      type: Number,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    deliverySpeed: {
      type: String,
      required: true
    },
    dateDeliveryDue: {
      type: Date,
      required: true
    },
    delivered: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
