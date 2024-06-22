const mongoose = require("mongoose");

const stockDetailSchema = new mongoose.Schema({
  size: { type: String, required: true },
  quantity: { type: Number, default: 0 },
});

const colorStockSchema = new mongoose.Schema({
  colorCode: { type: String, required: true },
  details: { type: [stockDetailSchema], required: true },
});

const productDepotSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  importPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  stockDetails: { type: [colorStockSchema], required: true },
  importTotal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductDepot = mongoose.model("ProductDepot", productDepotSchema);

module.exports = ProductDepot;
