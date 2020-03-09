const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product"
        },
        name: {
          type: String,
          required: true
        },
        imageUrl: {
          type: String
        },
        price: {
          type: Number,
          required: true
        },
        size: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
