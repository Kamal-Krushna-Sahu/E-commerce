import express from "express";
import {
  loginUser,
  registerUser,
  checkAuth,
} from "../controllers/auth/auth.controller.js";
import { verifyJwt } from "../middlewares/auth/auth.middleware.js";

const router = express.Router();

router.route("/register-user").post(registerUser);
router.route("/login-user").post(loginUser);

// protected routes
router.route("/check-auth").get(verifyJwt, checkAuth);

export default router;
