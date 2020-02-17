const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true
    },
    sizes: [
      {
        size: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],
    price: {
      type: Number,
      required: true
    },
    category: [
      {
        type: String,
        required: true
      }
    ]
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
