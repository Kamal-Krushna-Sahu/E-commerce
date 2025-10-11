import express from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products.controller.js";

const router = express.Router();

router.route("/get-all-products").get(getFilteredProducts);
router.route("/get-product-details/:id").get(getProductDetails);

export default router;
