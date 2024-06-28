const bodyParser = require("body-parser");
const express = require("express");

const { UserController } = require("../controllers/index.js");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

//create router
userRouter.post("/create", UserController.create);
userRouter.get("/update-user/:id", UserController.updateUserById);
userRouter.get("/add-address/:id", UserController.addShippingAddress);

module.exports = userRouter;
