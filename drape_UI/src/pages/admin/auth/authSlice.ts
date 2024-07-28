import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { client, Endpoints } from "../../../api/client";

interface AuthError {
  message: string;
  statusCode?: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: AuthError | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  { id: string; name: string },
  { email: string; password: string },
  { rejectValue: AuthError }
>(Endpoints.login, async (credentials, { rejectWithValue }) => {
  try {
    const response = await client.post(Endpoints.login, credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response) {
      return rejectWithValue({
        message: error.response.data.message,
        statusCode: error.response.status,
      });
    } else {
      return rejectWithValue({
        message: error.message,
      });
    }
  }
});

export const register = createAsyncThunk<
  { id: string; name: string },
  {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  },
  { rejectValue: AuthError }
>(Endpoints.register, async (credentials, { rejectWithValue }) => {
  console.log(credentials);
  try {
    const response = await client.post(Endpoints.register, credentials);
    return response.data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    if (error.response) {
      return rejectWithValue({
        message: error.response.data.message,
        statusCode: error.response.status,
      });
    } else {
      return rejectWithValue({
        message: error.message,
      });
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ id: string; name: string }>) => {
          state.isAuthenticated = true;
          state.user = action.payload;
          state.status = "succeeded";
          state.error = null;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = { message: "An unknown error occurred" };
        }
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
