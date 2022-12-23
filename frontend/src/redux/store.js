import { configureStore } from "@reduxjs/toolkit";
import productDetailsSlice from "./productDetailsSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";
import loadUserSlice from "./loadUser";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    product: productSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    loggedInUser: loadUserSlice,
    cart: cartSlice,
  },
});

export default store;
