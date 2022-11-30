import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import loadUserSlice from "./loadUser";
const store = configureStore({
  reducer: {
    product: productSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    loggedInUser: loadUserSlice,
  },
});

export default store;
