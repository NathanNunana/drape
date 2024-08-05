import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { client, Endpoints } from "../../../api/client";

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

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  tokens: null,
  status: "idle",
  error: null,
};

const loadState = (): AuthState => {
  const savedState = localStorage.getItem("authState");
  return savedState ? JSON.parse(savedState) : initialState;
};

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
        (error as AxiosError).response?.data || {
          message: "Registration failed",
        },
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
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
        state.error = (action.payload as AuthError) || {
          message: "An unknown error occurred",
        };
      })
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
        state.error = (action.payload as AuthError) || {
          message: "An unknown error occurred",
        };
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
