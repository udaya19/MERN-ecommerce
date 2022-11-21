import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    getProductDetailsRequest: (state) => {
      state.loading = true;
    },
    getProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductDetailsFail: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getProductDetailsFail,
  getProductDetailsRequest,
  getProductDetailsSuccess,
  clearError,
} = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
