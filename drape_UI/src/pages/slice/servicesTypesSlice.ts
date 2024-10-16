import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

// Define the ServiceType interface
export interface ServiceType {
  id: number;
  name: string;
  description: string;
}

// Define the initial state of the service types
export interface ServiceTypesState {
  serviceTypes: ServiceType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServiceTypesState = {
  serviceTypes: [],
  status: "idle",
  error: null,
};

// Thunk to fetch service types
export const fetchServiceTypes = createAsyncThunk(
  "serviceTypes/fetchServiceTypes",
  async () => {
    const response = await client.get(Endpoints.serviceTypes);
    return response.data;
  }
);

// Thunk to create a new service type
export const createServiceType = createAsyncThunk(
  "serviceTypes/createServiceType",
  async (serviceTypeData: { name: string; description: string }) => {
    const response = await client.post(Endpoints.serviceTypes, serviceTypeData);
    return response.data;
  }
);

// Thunk to update an existing service type
export const updateServiceType = createAsyncThunk(
  "serviceTypes/updateServiceType",
  async (serviceTypeData: ServiceType) => {
    const { id, ...data } = serviceTypeData;
    const response = await client.put(`${Endpoints.serviceTypes}${id}/`, data);
    return response.data;
  }
);

// Thunk to delete a service type
export const deleteServiceType = createAsyncThunk(
  "serviceTypes/deleteServiceType",
  async (id: number) => {
    await client.delete(`${Endpoints.serviceTypes}${id}/`);
    return id;
  }
);

const serviceTypesSlice = createSlice({
  name: "serviceTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchServiceTypes.fulfilled,
        (state, action: PayloadAction<ServiceType[]>) => {
          state.status = "succeeded";
          state.serviceTypes = action.payload;
        }
      )
      .addCase(fetchServiceTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createServiceType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createServiceType.fulfilled, (state, action: PayloadAction<ServiceType>) => {
        state.status = "succeeded";
        state.serviceTypes.push(action.payload);
      })
      .addCase(createServiceType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateServiceType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateServiceType.fulfilled,
        (state, action: PayloadAction<ServiceType>) => {
          state.status = "succeeded";
          state.serviceTypes = state.serviceTypes.map((type) =>
            type.id === action.payload.id ? action.payload : type
          );
        }
      )
      .addCase(updateServiceType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteServiceType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteServiceType.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.serviceTypes = state.serviceTypes.filter(
          (type) => type.id !== action.payload
        );
      })
      .addCase(deleteServiceType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default serviceTypesSlice.reducer;
