import { createSlice } from "@reduxjs/toolkit";

// localStorage se saved user uthao
const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: savedUser ? true : false,
  user: savedUser ? savedUser.user : null,
  role: savedUser ? savedUser.user.role : null,
  token: savedUser ? savedUser.token : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
      state.token = action.payload.token || null;
    },

    logout: (state) => {
      localStorage.removeItem("user");

      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;