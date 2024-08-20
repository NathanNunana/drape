import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { client, Endpoints } from "../../../api/client";

// Define interfaces for error and auth state
interface AuthError {
  message: string;
  statusCode?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  tokens: {
    refresh: string;
    access: string;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: AuthError | null;
}

// Initial state for authentication
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  status: "idle",
  error: null,
};

// Load saved auth state from localStorage
const loadState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  return savedState ? JSON.parse(savedState) : initialState;
};

// Login action
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await client.post(Endpoints.login, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || { message: "Login failed" },
      );
    }
  },
);

// Register action
export const register = createAsyncThunk(
  "auth/register",
  async (
    userInfo: {
      username: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await client.post(Endpoints.register, userInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || { message: "Registration failed" },
      );
    }
  },
);

// Activate account action
export const activateAccount = createAsyncThunk(
  "auth/activateAccount",
  async (
    { uidb64, token }: { uidb64: string; token: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await client.get(Endpoints.activateAccount(uidb64, token));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || { message: "Account activation failed" },
      );
    }
  },
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
    // Logout action
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.tokens = null;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("authState");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login actions
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: {
              id: string;
              username: string;
              first_name: string;
              last_name: string;
              email: string;
            };
            refresh: string;
            access: string;
          }>,
        ) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.tokens = {
            access: action.payload.access,
            refresh: action.payload.refresh,
          };
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("authState", JSON.stringify(state));
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as AuthError) || { message: "An unknown error occurred" };
      })

      // Handle register actions
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (
          state,
          action: PayloadAction<{
            user: {
              id: string;
              username: string;
              first_name: string;
              last_name: string;
              email: string;
            };
            tokens: { refresh: string; access: string };
          }>,
        ) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.tokens = action.payload.tokens;
          state.status = "succeeded";
          state.error = null;
          localStorage.setItem("authState", JSON.stringify(state));
        },
      )
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as AuthError) || { message: "An unknown error occurred" };
      })

      // Handle activate account actions
      .addCase(activateAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(activateAccount.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(activateAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as AuthError) || { message: "Account activation failed" };
      });
  },
});

// Export logout action and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
