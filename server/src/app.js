import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/auth/user.routes.js";
import adminProductsRouter from "./routes/admin/products.routes.js";
import shopProductsRouter from "./routes/shop/products.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin/products", adminProductsRouter);
app.use("/api/v1/shop/products", shopProductsRouter);

// Configuration to return "JSON error" instead of returning "HTML error" so that we can get "error message" in frontend.
// After all routes and other middleware:
import { errorHandler } from "./utils/errorHandler.js";
app.use(errorHandler);

export { app };
