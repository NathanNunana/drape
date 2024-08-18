import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface Service {
  id: number;
  title: string;
  description: string;
  operations: string;
  file?: File | null;
  service_type: number;
}

interface ServicesState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ServicesState = {
  services: [],
  status: "idle",
  error: null,
};

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await client.get(Endpoints.services);
    return response.data;
  },
);

export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData: Service) => {
    const response = await client.post(Endpoints.services, serviceData);
    return response.data;
  },
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async (serviceData: Service) => {
    const response = await client.put(
      `${Endpoints.services}/${serviceData.id}/`,
      serviceData,
    );
    return response.data;
  },
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id: number) => {
    await client.delete(`${Endpoints.services}/${id}/`);
    return id;
  },
);

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
        (state, action: PayloadAction<Service[]>) => {
          state.status = "succeeded";
          state.services = action.payload;
        },
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.status = "succeeded";
          state.services.push(action.payload);
        },
      )
      .addCase(createService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.status = "succeeded";
          const index = state.services.findIndex(
            (s) => s.id === action.payload.id,
          );
          if (index !== -1) {
            state.services[index] = action.payload;
          }
        },
      )
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteService.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.services = state.services.filter(
            (s) => s.id !== action.payload,
          );
        },
      )
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default servicesSlice.reducer;
