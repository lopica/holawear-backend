const createHttpError = require("http-errors");
const db = require("../models");
const Cart = db.cart;
const Product = db.product;
const User = db.user;
const Tag = db.tag;
const Type = db.type;
const Category = db.category;
const Brand = db.brand;

// GET cart by user ID
const getCartByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const cart = await Cart.findOne({ userId }).populate("cartItems.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const data = {
      id: cart._id,
      userId: cart.userId,
      cartItems: cart.cartItems.map((item) => ({
        id: item._id,
        productTitle: item.productId.title,
        productId: item.productId._id,
        thumbnail: item.productId.thumbnail,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: cart.totalPrice,
    };
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

// POST create cart for user
const createCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const newCart = new Cart({ userId, cartItems: [], totalPrice: 0 });
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    next(error);
  }
};

// POST add product to cart
const addProductToCart = async (req, res, next) => {
  try {
    const { cartItem, userId, totalPrice } = req.body;

    // Find the cart by userId
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Update existing cart
      const productIndex = cart.cartItems.findIndex((item) => item.productId.toString() === cartItem.productId && item.color === cartItem.color && item.size === cartItem.size);

      if (productIndex > -1) {
        // If product with the same color and size already exists in cart, update the quantity
        cart.cartItems[productIndex].quantity += cartItem.quantity;
      } else {
        // If product does not exist in cart, add new item
        cart.cartItems.push(cartItem);
      }

      // Update the total price of the cart
      cart.totalPrice += cartItem.price * cartItem.quantity;
    } else {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, cartItems: [cartItem], totalPrice });
    }

    const savedCart = await cart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    next(error);
  }
};

// Remove 1 item from cart
const deleteOneItemFromCart = async (req, res, next) => {
  try {
    const { userId, productId, color, size } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const productIndex = cart.cartItems.findIndex((item) => item.productId.toString() === productId && item.color === color && item.size === size);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    const product = cart.cartItems[productIndex];
    if (product.quantity === 1) {
      cart.cartItems.splice(productIndex, 1);
    } else {
      product.quantity -= 1;
    }
    cart.totalPrice -= product.price;
    const savedCart = await cart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    next(error);
  }
};

// POST remove ordered items from cart
const removeOrderedItemsFromCart = async (req, res, next) => {
  try {
    const { userId, orderedItems } = req.body;
    console.log(orderedItems + " " + userId);
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // Remove ordered items from cart
    cart.cartItems = cart.cartItems.filter(
      (cartItem) => !orderedItems.some((orderedItem) => orderedItem.productId === cartItem.productId && orderedItem.color === cartItem.color && orderedItem.size === cartItem.size),
    );
    // Recalculate total price
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
  } catch (error) {
    next(error);
  }
};

module.exports = { addProductToCart, getCartByUserId, createCart, removeOrderedItemsFromCart };
