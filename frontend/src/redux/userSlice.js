import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserRequest: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    setUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload?.user;
      console.log("Action payload:", action?.payload);
      localStorage.setItem("token", action.payload?.token);
    },
    setUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
  },
});

export default userSlice.reducer;
export const { setUserFail, setUserRequest, setUserSuccess } =
  userSlice.actions;
