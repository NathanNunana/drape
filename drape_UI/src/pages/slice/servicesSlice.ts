import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface ServicesState {
  id: string;
  name: string;
  description: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServicesState = {
  id: "",
  name: "",
  description: "",
  status: "idle",
  error: null,
};

export const fetchServices = createAsyncThunk(Endpoints.services, async () => {
  const response = await client.get(Endpoints.services);
  return response.data;
});

const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchServices.fulfilled,
        (
          state,
          action: PayloadAction<
            { id: string; name: string; description: string }[]
          >,
        ) => {
          state.status = "succeeded";
          if (action.payload.length > 0) {
            state.id = action.payload[0].id;
            state.name = action.payload[0].name;
            state.description = action.payload[0].description;
          }
        },
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default servicesSlice.reducer;
