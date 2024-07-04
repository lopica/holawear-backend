const express = require("express");
const productRouter = express.Router();

const { ProductController } = require("../controllers/index.js");

productRouter.get("/get-all-product", ProductController.getAllProducts);

// GET a single product by ID
productRouter.get("/get-detail-product/:id", ProductController.getProductById);

// POST create a new product
productRouter.post("/create", ProductController.createProduct);

// PUT update a product by ID
productRouter.put("/:id", ProductController.updateProduct);

// DELETE delete a product by ID
productRouter.delete("/:id", ProductController.deleteProduct);

// GET list product by category id || tag id || brand id || type id
productRouter.get("/get-product-by-category-id/:id", ProductController.getProductByCategoryId);

//import excel
productRouter.post("/import", ProductController.importProducts);

//PUT update product status
productRouter.put("/status/:productId", ProductController.updateProductStatus);

module.exports = productRouter;
