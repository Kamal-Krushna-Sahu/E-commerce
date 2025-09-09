import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import adminProductsReducer from "./admin/products-slice/productsSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
  },
});

export default store;
