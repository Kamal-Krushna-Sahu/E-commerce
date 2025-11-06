import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice.js";
import adminProductsReducer from "./admin/products-slice/productsSlice.js";
import shoppingProductsReducer from "./shop/products-slice/productsSlice.js";
import shoppingCartReducer from "./shop/cart-slice/cartSlice.js";
import shoppingAddressReducer from "./shop/cart-slice/cartSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    shopProducts: shoppingProductsReducer,
    shopCart: shoppingCartReducer,
    shopAddress: shoppingAddressReducer,
  },
});

export default store;
