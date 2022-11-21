import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import productSlice from "./productSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    productDetails: productDetailsSlice,
  },
});

export default store;
