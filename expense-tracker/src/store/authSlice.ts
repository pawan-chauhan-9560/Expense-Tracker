import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Get initial state from localStorage if available
const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const initialState: AuthState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  isAuthenticated: !!storedUser && !!storedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
