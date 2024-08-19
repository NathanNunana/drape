import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

// Define the shape of an address object
export interface Address {
  id: number;
  street_name: string;
  digital_address: string;
  city: string;
  country: string;
  email: string;
}

// Define the shape of the state
export interface AddressState {
  addresses: Address[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state for the slice
const initialState: AddressState = {
  addresses: [],
  status: "idle",
  error: null,
};

// Thunks for async operations
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await client.get(Endpoints.address);
    return response.data;
  }
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData: Address) => {
    const response = await client.post(Endpoints.address, addressData);
    return response.data;
  }
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async (addressData: Address) => {
    const response = await client.put(
      `${Endpoints.address}${addressData.id}/`,
      addressData
    );
    return response.data;
  }
);

// Slice definition
const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action: PayloadAction<Address[]>) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.status = "succeeded";
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAddress.fulfilled, (state, action: PayloadAction<Address>) => {
        state.status = "succeeded";
        const index = state.addresses.findIndex(address => address.id === action.payload.id);
        if (index !== -1) {
          state.addresses[index] = action.payload;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default addressSlice.reducer;
