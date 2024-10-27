import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

// Define the ServiceType interface
export interface ProductType {
  id: number;
  type_name: string;
}

// Define the initial state of the service types
export interface ProductTypesState {
  productTypes: ProductType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductTypesState = {
  productTypes: [],
  status: "idle",
  error: null,
};

// Thunk to fetch service types
export const fetchProductTypes = createAsyncThunk(
  "serviceTypes/fetchServiceTypes",
  async () => {
    const response = await client.get(Endpoints.productType);
    return response.data;
  }
);

// Thunk to create a new service type
export const createProductType = createAsyncThunk(
  "serviceTypes/createServiceType",
  async (productTypeData: { type_name: string }) => {
    const response = await client.post(Endpoints.productType, productTypeData);
    return response.data;
  }
);

// Thunk to update an existing service type
export const updateProductType = createAsyncThunk(
  "serviceTypes/updateServiceType",
  async (productTypeData: ProductType) => {
    const { id, ...data } = productTypeData;
    const response = await client.put(`${Endpoints.productType}${id}/`, data);
    return response.data;
  }
);

// Thunk to delete a service type
export const deleteProductType = createAsyncThunk(
  "serviceTypes/deleteServiceType",
  async (id: number) => {
    await client.delete(`${Endpoints.productType}${id}/`);
    return id;
  }
);

const productTypeSlice = createSlice({
  name: "productTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProductTypes.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.status = "succeeded";
          state.productTypes = action.payload;
        }
      )
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createProductType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductType.fulfilled, (state, action: PayloadAction<ProductType>) => {
        state.status = "succeeded";
        state.productTypes.push(action.payload);
      })
      .addCase(createProductType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateProductType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateProductType.fulfilled,
        (state, action: PayloadAction<ProductType>) => {
          state.status = "succeeded";
          state.productTypes = state.productTypes.map((type) =>
            type.id === action.payload.id ? action.payload : type
          );
        }
      )
      .addCase(updateProductType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteProductType.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductType.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.productTypes = state.productTypes.filter(
          (type) => type.id !== action.payload
        );
      })
      .addCase(deleteProductType.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default productTypeSlice.reducer;
