import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
  },
});

export default store;
