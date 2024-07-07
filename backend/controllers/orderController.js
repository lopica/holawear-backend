const createHttpError = require("http-errors");
const db = require("../models");
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const Tag = db.tag;
const Type = db.type;
const Category = db.category;
const Brand = db.brand;
const Order = db.order;

// GET order by user ID
// POST create order for user
const createOrder = async (req, res, next) => {
  try {
    const { userId, orderItems, shippingAddress, totalPrice, orderStatus } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newOrder = new Order({ userId, orderItems, shippingAddress, totalPrice, orderStatus, isPayment: false });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
