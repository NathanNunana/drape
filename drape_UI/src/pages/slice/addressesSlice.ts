import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface AddressState {
  id: number;
  street_name: string;
  digital_address: string;
  city: string;
  country: string;
  email: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AddressState = {
  id: 0,
  street_name: "",
  digital_address: "",
  city: "",
  country: "",
  email: "",
  status: "idle",
  error: null,
};

export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await client.get(`${Endpoints.address}/1`);
    return response.data;
  },
);

export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData: {
    street_name: string;
    digital_address: string;
    city: string;
    country: string;
    email: string;
  }) => {
    const response = await client.post(Endpoints.address, addressData);
    return response.data;
  },
);

export const updateAddress = createAsyncThunk(
  "addresses/updateAddress",
  async (addressData: {
    id: number;
    street_name: string;
    digital_address: string;
    city: string;
    country: string;
    email: string;
  }) => {
    const response = await client.put(
      `${Endpoints.address}/${addressData.id}/`,
      addressData,
    );
    return response.data;
  },
);

const addressSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAddresses.fulfilled,
        (state, action: PayloadAction<AddressState>) => {
          state.status = "succeeded";
          const { id, street_name, digital_address, city, country, email } =
            action.payload;
          state.id = id;
          state.street_name = street_name;
          state.digital_address = digital_address;
          state.city = city;
          state.country = country;
          state.email = email;
        },
      )
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createAddress.fulfilled,
        (state, action: PayloadAction<AddressState>) => {
          state.status = "succeeded";
        },
      )
      .addCase(createAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateAddress.fulfilled,
        (state, action: PayloadAction<AddressState>) => {
          state.status = "succeeded";
        },
      )
      .addCase(updateAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default addressSlice.reducer;
