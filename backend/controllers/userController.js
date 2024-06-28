const db = require("../models");
const User = db.user;
const ShippingAddress = db.shippingAddress;

// Create a user
async function create(req, res, next) {
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
      role: req.body.role,
    });
    await newUser
      .save()
      .then((newDoc) => {
        res.status(201).json(newDoc);
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

// Get all users

// Update a user by user ID
async function updateUserById(req, res, next) {}

// Delete a user

// Get user by email
async function getUserByEmail(req, res, next) {
  try {
    const email = req.params.email;
    await User.findOne({ email: email })
      .then((user) => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

//Add shipping address by user ID
async function addShippingAddress(req, res, next) {
  try {
    const userId = req.params.id;
    const address = {
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      specificAddress: req.body.specificAddress,
    };

    await User.findByIdAndUpdate(userId, { $push: { shippingAddress: address } }, { new: true })
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).send("User not found");
        }
      })
      .catch((error) => {
        next(error);
      });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  getUserByEmail,
  updateUserById,
  addShippingAddress,
};
