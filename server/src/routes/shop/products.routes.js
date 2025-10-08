import express from "express";
import { getFilteredProducts } from "../../controllers/shop/products.controller.js";

const router = express.Router();

router.route("/get-all-products").get(getFilteredProducts);

export default router;
