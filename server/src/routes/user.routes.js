import express from "express";
import {
  loginUser,
  registerUser,
} from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);

export default router;
