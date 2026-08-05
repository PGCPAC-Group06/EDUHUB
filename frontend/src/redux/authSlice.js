import { createSlice } from "@reduxjs/toolkit";

// localStorage se saved user uthao
const savedUser = JSON.parse(localStorage.getItem("user"));

const initialState = {
  isLoggedIn: savedUser ? true : false,
  user: savedUser ? savedUser.user : null,
  role: savedUser ? savedUser.user.role : null,
<<<<<<< HEAD
=======
  token: savedUser ? savedUser.token : null,
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.user.role;
<<<<<<< HEAD
=======
      state.token = action.payload.token || null;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    },

    logout: (state) => {
      localStorage.removeItem("user");

      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
<<<<<<< HEAD
=======
      state.token = null;
>>>>>>> 539bd96fd1185a2797a6384936b888cd0cc1336a
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;