const uuid = require("uuid/v1");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const CustomerAddress = require("../models/CustomerAddress");

exports.postPayment = async (req, res, next) => {
  try {
    const { token, cartItems, addressId, deliverySpeed } = req.body;

    const purchasedCart = await Cart.create({
      customer: req.user._id,
      cart: cartItems
    });

    let subtotalOfIndividualCartItem = cartItems.map(async item => {
      const product = await Product.findById(item._id);
      return product.price * item.quantity;
    });

    subtotalOfIndividualCartItem = await Promise.all(
      subtotalOfIndividualCartItem
    );

    const subtotal = subtotalOfIndividualCartItem.reduce(
      (acc, price) => acc + price,
      0
    );

    const setDeliveryPrice = deliverySpeed => {
      switch (deliverySpeed) {
        case "Standard":
          return 3.49;
        case "Two Day":
          return 7.99;
        case "Next Day":
          return 11.99;
      }
    };

    const deliveryPrice = setDeliveryPrice(deliverySpeed);

    let total;
    if (deliveryPrice === 3.49 && subtotal > 50) {
      total = subtotal;
    } else {
      total = subtotal + deliveryPrice;
    }
    total = parseFloat(total.toFixed(2));

    const body = {
      source: token.id,
      amount: total * 100,
      currency: "gbp",
      receipt_email: token.email,
      description: purchasedCart._id.toString()
    };

    const charge = await stripe.charges.create(body);

    const now = new Date();
    let day = now.getDay();
    if (now.getHours() >= 20) day = day + 1;

    const daysToWaitForDelivery = deliverySpeed => {
      switch (deliverySpeed) {
        case "Standard":
          return 5;
        case "Two Day":
          return 2;
        case "Next Day":
          return 1;
      }
    };

    const waitInDays = daysToWaitForDelivery(deliverySpeed);

    let dayDelivered = new Date();
    if (dayDelivered.getHours() >= 20) {
      const month = dayDelivered.getMonth() + 1;
      const year = dayDelivered.getFullYear();
      const day = dayDelivered.getDate() + 1;
      dayDelivered = new Date(
        year.toString() + "-" + month.toString() + "-" + day.toString()
      );
    }

    let i = 0;
    while (i < waitInDays) {
      dayDelivered.setDate(dayDelivered.getDate() + 1);
      if (dayDelivered.getDay() !== 0 && dayDelivered.getDay() !== 6) i++;
      if (waitInDays === 1) i++;
    }

    let order = await Order.create({
      cart: purchasedCart._id,
      customerAddress: addressId,
      customer: req.user._id,
      deliveryPrice,
      subtotal,
      total,
      deliverySpeed,
      dateDeliveryDue: dayDelivered,
      delivered: false
    });

    const updateProducts = cartItems.map(async item => {
      const product = await Product.findById({ _id: item._id });
      const sizes = [...product.sizes];
      const updatedSizes = sizes.map(size => {
        if (size.size === item.size) {
          size.quantity = size.quantity - item.quantity;
        }
        return size;
      });

      await Product.updateOne({ _id: item._id }, { sizes: updatedSizes });
      return await Product.findById(item._id);
    });

    const updatedProducts = await Promise.all(updateProducts);

    order = await Order.findById(order._id)
      .populate("cart")
      .populate("customerAddress")
      .exec();

    return res.status(200).json({
      updatedProducts,
      order
    });
  } catch (error) {
    console.log(error);
  }
};
