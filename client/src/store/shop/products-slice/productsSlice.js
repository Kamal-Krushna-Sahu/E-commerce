import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllFilteredProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:3000/api/v1/shop/products/get-all-products?${query}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shopProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFilteredProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });
    builder.addCase(fetchAllFilteredProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
  },
});

export default shoppingProductSlice.reducer;
