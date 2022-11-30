import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: "",
  loading: false,
};

const loadUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload.error;
    },
  },
});

export default loadUserSlice.reducer;
export const { loadUserSuccess, loadUserFail, loadUserRequest } =
  loadUserSlice.actions;
