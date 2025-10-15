import express from "express";
import {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem,
} from "../../controllers/shop/cart.controller.js";

const router = express.Router();

router.route("/add").post(addToCart);
router.route("/get/:userId").get(fetchCartItems);
router.route("/update-cart").put(updateCartItemQty);
router.route("/:userId/:productId").delete(deleteCartItem);

export default router;
