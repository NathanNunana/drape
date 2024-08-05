import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface AnalyticsState {
  analytics: { name: string; value: string }[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AnalyticsState = {
  analytics: [],
  status: "idle",
  error: null,
};

export const fetchAnalytics = createAsyncThunk(
  "analytics/fetchAnalytics",
  async () => {
    const response = await client.get(Endpoints.analytics);
    return response.data;
  },
);

export const createAnalytic = createAsyncThunk(
  "analytics/createAnalytic",
  async (analyticData: { name: string; value: string }) => {
    const response = await client.post(Endpoints.analytics, analyticData);
    return response.data;
  },
);

export const updateAnalytic = createAsyncThunk(
  "analytics/updateAnalytic",
  async (analyticData: { name: string; value: string }) => {
    const response = await client.put(Endpoints.analytics, analyticData);
    return response.data;
  },
);

export const deleteAnalytic = createAsyncThunk(
  "analytics/deleteAnalytic",
  async (name: string) => {
    await client.delete(`${Endpoints.analytics}/${name}`);
    return name;
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
      .addCase(
        fetchAnalytics.fulfilled,
        (state, action: PayloadAction<{ name: string; value: string }[]>) => {
          state.status = "succeeded";
          state.analytics = action.payload;
        },
      )
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAnalytic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAnalytic.fulfilled, (state, action) => {
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
      .addCase(updateAnalytic.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.analytics.findIndex(
          (a) => a.name === action.payload.name,
        );
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
      .addCase(deleteAnalytic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.analytics = state.analytics.filter(
          (a) => a.name !== action.payload,
        );
      })
      .addCase(deleteAnalytic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default analyticsSlice.reducer;
