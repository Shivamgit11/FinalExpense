import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isLoggedin: false, token: null };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isLoggedin = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isLoggedin = false;
      state.token = null;
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
