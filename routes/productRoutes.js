import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// create New Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get products
router.get("/get-products", getProductController);

// get single Product
router.get("/get-product/:slug", getSingleProductController);

// get Product photo
router.get("/product-photo/:pid", productPhotoController);

// get single Product
router.delete("/delete-product/:pid", deleteProductController);

//update a product
// create New Product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product route
router.get("/search/:keyword", searchProductController);

//get similar product route
router.get("/related-product/:pid/:cid", relatedProductController);

//Category wise product route
router.get("/product-category/:slug", productCategoryController);

//payments route
//token
router.get("/braintree/token", braintreeTokenController)

//payments
router.post('/braintree/payment', requireSignIn, brainTreePaymentController)

export default router;
