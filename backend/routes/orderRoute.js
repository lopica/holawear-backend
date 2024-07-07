const express = require("express");
const orderRouter = express.Router();

const { OrderController } = require("../controllers/index.js");

//create order
orderRouter.post("/create-order", OrderController.createOrder);
module.exports = orderRouter;
