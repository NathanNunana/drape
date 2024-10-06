import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

// Define TypeScript interfaces
export interface OpeningHour {
  id: number; // Add an `id` field for identification
  duration: string;
  type: number; // Assuming `type` refers to an ID of the `OpeningHourType`
}

export interface OpeningHourType {
  id: number; // Ensure `id` field is used for identification
  name: string;
}

export interface OpeningHoursState {
  openingHours: OpeningHour[];
  types: OpeningHourType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OpeningHoursState = {
  openingHours: [],
  types: [],
  status: "idle",
  error: null,
};

// Fetch opening hours
export const fetchOpeningHours = createAsyncThunk(
  "openingHours/fetchOpeningHours",
  async () => {
    const response = await client.get(Endpoints.openingHours);
    return response.data;
  }
);

// Fetch opening hour types
export const fetchTypes = createAsyncThunk(
  "openingHours/fetchTypes",
  async () => {
    const response = await client.get(Endpoints.openingHoursType);
    return response.data;
  }
);

// Create opening hour
export const createOpeningHour = createAsyncThunk(
  "openingHours/createOpeningHour",
  async (openingHour: Omit<OpeningHour, 'id'>) => { // Exclude `id` during creation
    const response = await client.post(Endpoints.openingHours, openingHour);
    return response.data;
  }
);

// Update opening hour
export const updateOpeningHour = createAsyncThunk(
  "openingHours/updateOpeningHour",
  async (openingHour: OpeningHour) => {
    const response = await client.put(
      `${Endpoints.openingHours}${openingHour.id}/`, // Ensure `/` at the end
      openingHour
    );
    return response.data;
  }
);

// Delete opening hour
export const deleteOpeningHour = createAsyncThunk(
  "openingHours/deleteOpeningHour",
  async (id: number) => {
    await client.delete(`${Endpoints.openingHours}${id}/`); // Ensure `/` at the end
    return id;
  }
);

// Create opening hour type
export const createType = createAsyncThunk(
  "openingHours/createType",
  async (type: Omit<OpeningHourType, 'id'>) => { // Exclude `id` during creation
    const response = await client.post(Endpoints.openingHoursType, type);
    return response.data;
  }
);

// Update opening hour type
export const updateType = createAsyncThunk(
  "openingHours/updateType",
  async (type: OpeningHourType) => {
    const response = await client.put(
      `${Endpoints.openingHoursType}${type.id}/`, // Ensure `/` at the end
      type
    );
    return response.data;
  }
);

// Delete opening hour type
export const deleteType = createAsyncThunk(
  "openingHours/deleteType",
  async (id: number) => {
    await client.delete(`${Endpoints.openingHoursType}${id}/`); // Ensure `/` at the end
    return id;
  }
);

const openingHoursSlice = createSlice({
  name: "openingHours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpeningHours.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOpeningHours.fulfilled, (state, action: PayloadAction<OpeningHour[]>) => {
        state.status = "succeeded";
        state.openingHours = action.payload;
      })
      .addCase(fetchOpeningHours.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(fetchTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTypes.fulfilled, (state, action: PayloadAction<OpeningHourType[]>) => {
        state.status = "succeeded";
        state.types = action.payload;
      })
      .addCase(fetchTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createOpeningHour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOpeningHour.fulfilled, (state, action: PayloadAction<OpeningHour>) => {
        state.status = "succeeded";
        state.openingHours.push(action.payload);
      })
      .addCase(createOpeningHour.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateOpeningHour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOpeningHour.fulfilled, (state, action: PayloadAction<OpeningHour>) => {
        state.status = "succeeded";
        const index = state.openingHours.findIndex(
          (oh) => oh.id === action.payload.id
        );
        if (index !== -1) {
          state.openingHours[index] = action.payload;
        }
      })
      .addCase(updateOpeningHour.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteOpeningHour.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOpeningHour.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.openingHours = state.openingHours.filter(
          (oh) => oh.id !== action.payload
        );
      })
      .addCase(deleteOpeningHour.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createType.fulfilled, (state, action: PayloadAction<OpeningHourType>) => {
        state.status = "succeeded";
        state.types.push(action.payload);
      })
      .addCase(createType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateType.fulfilled, (state, action: PayloadAction<OpeningHourType>) => {
        state.status = "succeeded";
        const index = state.types.findIndex(
          (type) => type.id === action.payload.id
        );
        if (index !== -1) {
          state.types[index] = action.payload;
        }
      })
      .addCase(updateType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteType.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.types = state.types.filter(
          (type) => type.id !== action.payload
        );
      })
      .addCase(deleteType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default openingHoursSlice.reducer;
