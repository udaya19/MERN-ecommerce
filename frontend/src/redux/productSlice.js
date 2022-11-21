import { createSlice } from "@reduxjs/toolkit";
const initalState = {
  products: null,
  loading: false,
  error: null,
};
// const productSlice = createSlice({
//   name: "products",
//   initalState,
//   reducers: {
//     getProductsRequest: (state) => {
//       state.loading = true;
//       state.products = [];
//     },
//     getProductsSuccess: (state, action) => {
//       state.loading = false;
//       state.products = action.payload;
//     },
//     getProductsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     clearError: (state) => ({ ...state, error: null }),
//   },
// });

const productSlice = createSlice({
  name: "products",
  initialState: initalState,
  reducers: {
    getProductsRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
  },
});

export const { getProductsRequest } = productSlice.actions;
export default productSlice.reducer;
