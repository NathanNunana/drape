import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface Analytic {
  id: string;
  name: string;
  value: string;
}

export interface AnalyticsState {
  analytics: Analytic[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AnalyticsState = {
  analytics: [],
  status: "idle",
  error: null,
};

// Thunks
export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async () => {
    const response = await client.get(Endpoints.analytics);
    return response.data;
  },
);

export const createAnalytic = createAsyncThunk(
  "analytics/createAnalytic",
  async (analyticData: Omit<Analytic, "id">) => {
    const response = await client.post(Endpoints.analytics, analyticData);
    return response.data;
  },
);

export const updateAnalytic = createAsyncThunk(
  "analytics/updateAnalytic",
  async (analyticData: Analytic) => {
    const response = await client.put(`${Endpoints.analytics}${analyticData.id}/`, analyticData);
    return response.data;
  },
);

export const deleteAnalytic = createAsyncThunk(
  "analytics/deleteAnalytic",
  async (id: string) => {
    await client.delete(`${Endpoints.analytics}${id}/`);
    return id;
  },
);

// Slice
const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAnalytics.fulfilled, (state, action: PayloadAction<Analytic[]>) => {
        state.status = "succeeded";
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAnalytic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnalytic.fulfilled, (state, action: PayloadAction<Analytic>) => {
        state.status = "succeeded";
        state.analytics.push(action.payload);
      })
      .addCase(createAnalytic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateAnalytic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAnalytic.fulfilled, (state, action: PayloadAction<Analytic>) => {
        state.status = "succeeded";
        const index = state.analytics.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.analytics[index] = action.payload;
        }
      })
      .addCase(updateAnalytic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteAnalytic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAnalytic.fulfilled, (state, action: PayloadAction<string>) => {
        state.status = "succeeded";
        state.analytics = state.analytics.filter((a) => a.id !== action.payload);
      })
      .addCase(deleteAnalytic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default analyticsSlice.reducer;
