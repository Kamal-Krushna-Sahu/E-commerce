import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
  handleImageUpload,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../utils/cloudinary.js";

const router = express.Router();

router.route("/upload-image").post(upload.single("my_file"), handleImageUpload);
router.route("/add-product").post(addProduct);
router.route("/edit-product/:id").put(editProduct);
router.route("/delete-product/:id").delete(deleteProduct);
router.route("/get-all-products").get(fetchAllProducts);

export default router;
