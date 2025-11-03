import express from "express";
import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address.controller";

const router = express.Router();

router.route("/add").post(addAddress);
router.route("/get/:userId").get(fetchAllAddress);
router.route("/update/:userId/:addressId").put(editAddress);
router.route("/delete/:userId/:addressId").delete(deleteAddress);

export default router;
