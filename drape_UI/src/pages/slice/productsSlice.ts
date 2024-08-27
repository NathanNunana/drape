import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface Product {
  id: number;
  name: string;
  image?: File | string | null;
  base_type: string;
  color: string;
  noise_rating: string;
  integrated_diesel_tank_capacity: string;
  fuel_consumption: string;
  dimension: string;
  dry_weight: string;
  description: string;
  specification: string;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

// Thunks
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await client.get(Endpoints.products);
    return response.data;
  }
);

export const createProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append(key, value);
        } else if (key !== "image") {
          formData.append(key, value as string);
        }
      });

      const response = await client.post(Endpoints.products, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.image) {
        return rejectWithValue(error.response.data.image[0]);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "products/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        if (key === "image" && value) {
          formData.append(key, value as Blob);
        } else if (key !== "image") {
          formData.append(key, value as string);
        }
      });

      const response = await client.put(
        `${Endpoints.products}${productData.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.image) {
        return rejectWithValue(error.response.data.image[0]);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk<number, number>(
  "products/deleteProduct",
  async (id) => {
    await client.delete(`${Endpoints.products}${id}/`);
    return id;
  }
);

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action: PayloadAction<unknown, string, { arg: Omit<Product, "id">; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})), SerializedError>) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to create product";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = "succeeded";
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action: PayloadAction<unknown, string, { arg: Product; requestId: string; requestStatus: "rejected"; aborted: boolean; condition: boolean; } & ({ rejectedWithValue: true; } | ({ rejectedWithValue: false; } & {})), SerializedError>) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to update product";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = "succeeded";
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export default productsSlice.reducer;
