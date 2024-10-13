import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

// Define the Service interface
export interface Service {
  id: number;
  title: string;
  description: string;
  category?: string;
  operations: string;
  image?: File | string | null;
  service_type: number;
}

export interface ServicesState {
  services: Service[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state for the slice
const initialState: ServicesState = {
  services: [],
  status: "idle",
  error: null,
};

// Fetch services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await client.get(Endpoints.services);
    return response.data;
  },
);

// Create a new service
export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData: Omit<Service, 'id'>) => {
    const formData = new FormData();
    formData.append("title", serviceData.title);
    formData.append("description", serviceData.description);
    formData.append("operations", serviceData.operations);
    formData.append("service_type", serviceData.service_type.toString());
    if (serviceData.image) {
      formData.append("image", serviceData.image);
    }

    const response = await client.post(Endpoints.services, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
);

// Update an existing service
export const updateService = createAsyncThunk(
  "services/updateService",
  async (serviceData: Service) => {
    const formData = new FormData();
    formData.append("title", serviceData.title);
    formData.append("description", serviceData.description);
    formData.append("operations", serviceData.operations);
    formData.append("service_type", serviceData.service_type.toString());
    if (serviceData.image) {
      formData.append("image", serviceData.image);
    }

    const response = await client.put(
      `${Endpoints.services}${serviceData.id}/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  },
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id: number) => {
    await client.delete(`${Endpoints.services}${id}/`);
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
        }
      )
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch services";
      })
      .addCase(createService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.status = "succeeded";
          state.services.push(action.payload);
        }
      )
      .addCase(createService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create service";
      })
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateService.fulfilled,
        (state, action: PayloadAction<Service>) => {
          state.status = "succeeded";
          const index = state.services.findIndex(
            (s) => s.id === action.payload.id
          );
          if (index !== -1) {
            state.services[index] = action.payload;
          }
        }
      )
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to update service";
      })
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteService.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = "succeeded";
          state.services = state.services.filter(
            (s) => s.id !== action.payload
          );
        }
      )
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete service";
      });
  },
});

export default servicesSlice.reducer;
