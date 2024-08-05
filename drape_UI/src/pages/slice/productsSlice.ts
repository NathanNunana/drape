import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface ProductsState {
  id: string;
  name: string;
  description: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  id: "",
  name: "",
  description: "",
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(Endpoints.products, async () => {
  const response = await client.get(Endpoints.products);
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
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
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default productsSlice.reducer;
