const Order = require("../models/Order");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("cart")
      .populate("customerAddress")
      .exec();

    return res.status(200).json({ orders });
  } catch (err) {
    console.log(err);
    const error = new Error();
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById({ _id: req.params.orderId })
      .populate("cart")
      .populate("customerAddress")
      .exec();

    console.log(order.customer, req.user._id);
    if (order.customer.toString() !== req.user._id)
      return res
        .status(403)
        .json({ error: "You are not authorized to view this order" });

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    if (err.name === "TypeError" || "CastError")
      return res.status(400).json({ error: "No order with this ID is found" });
    const error = new Error();
    next(error);
  }
};
