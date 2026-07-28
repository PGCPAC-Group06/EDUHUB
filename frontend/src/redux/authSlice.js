import { createSlice } from "@reduxjs/toolkit";

const savedToken = localStorage.getItem("eduhub_token");
const savedUser = localStorage.getItem("eduhub_user")
  ? JSON.parse(localStorage.getItem("eduhub_user"))
  : null;

const initialState = {
  isLoggedIn: !!savedToken,
  user: savedUser,
  role: savedUser?.role || null,
  token: savedToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const payload = action.payload;
      const token = payload.token;

      // Handle both flat LoginResponse ({ userId, name, email, role, token })
      // and nested ({ user: {...}, token: ... })
      const user = payload.user || {
        userId: payload.userId,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };

      state.isLoggedIn = true;
      state.user = user;
      state.role = user.role;
      state.token = token || null;

      if (token) {
        localStorage.setItem("eduhub_token", token);   //Token stored in react
      }
      localStorage.setItem("eduhub_user", JSON.stringify(user));
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("eduhub_token");
      localStorage.removeItem("eduhub_user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;