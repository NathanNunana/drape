import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface Product {
  id?: number,
  name: string;
  image?: File | string;
  base_type: string;
  color: string;
  category: string;
  description: string;
  product_type: number | null;
  warranty_duration: number | null;
  specifications: Specifications;
}

interface Specifications {
  basic_generator_parameters: BasicGeneratorParameters;
  engine_specification: EngineSpecification;
  alternator_specification: AlternatorSpecification;
}

interface BasicGeneratorParameters {
  model_number: string | null;
  output_power: string | null;
  diesel_oil_type: string | null;
  output_voltage: string | null;
  output_current: string | null;
  normal_frequency: string | null;
  rated_speed: string | null;
  steady_state_voltage_regulation_rate: string | null;
  voltage_fluctuation_rate: string | null;
  transient_voltage_regulation: string | null;
  voltage_settling_time: string | null;
  steady_state_frequency_control: string | null;
  frequency_jitter: string | null;
  transient_frequency_fluctuation: string | null;
  frequency_stabilization_time: string | null;
  fuel_consumption_mcr: string | null;
  noise_lp7m: string | null;
}

interface EngineSpecification {
  diesel_engine_brand_provenance: string | null;
  diesel_engine_model_number: string | null;
  stand_by_power: string | null;
  cylinder_model_type: string | null;
  bore_stroke: string | null;
  compression_ratio: string | null;
  starting_system: string | null;
  cooling_system: string | null;
  fuel_system: string | null;
  speed_regulating_system: string | null;
  air_intake_method: string | null;
  displacement: string | null;
  engine_oil_capacity: string | null;
  rotation_rate: string | null;
}

interface AlternatorSpecification {
  alternator_brand_place_of_origin: string | null;
  motor_type: string | null;
  rated_power: string | null;
  rated_voltage: string | null;
  insulation_grade: string | null;
  protection_degree: string | null;
  connection_mode: string | null;
  adjustment_mode: string | null;
  output_frequency: string | null;
  output_factor: string | null;
}


export interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
};

// Thunks for creating and updating products
export const createProduct = createAsyncThunk<Product, Omit<Product, "id">>(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const payload = {
        ...productData,
        ...productData.specifications.basic_generator_parameters,
        ...productData.specifications.engine_specification,
        ...productData.specifications.alternator_specification,
      };

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value); // Append File objects as files
        } else {
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
      return rejectWithValue(error.response?.data?.image[0] || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk<Product, Product>(
  "products/updateProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const payload = {
        ...productData,
        ...productData.specifications.basic_generator_parameters,
        ...productData.specifications.engine_specification,
        ...productData.specifications.alternator_specification,
      };

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value); // Append File objects as files
        } else {
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
      return rejectWithValue(error.response?.data?.image[0] || error.message);
    }
  }
);

// Thunks
export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await client.get(Endpoints.products);
    return response.data;
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
