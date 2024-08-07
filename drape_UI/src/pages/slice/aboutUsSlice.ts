import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client"; // Adjust the import path as needed

export interface AboutUsState {
  id: number;
  file: string;
  motor: string;
  company_description: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AboutUsState = {
  id: 0,
  file: "",
  motor: "",
  company_description: "",
  status: "idle",
  error: null,
};

export const fetchAboutUs = createAsyncThunk(
  "aboutUs/fetchAboutUs",
  async () => {
    const response = await client.get(`${Endpoints.aboutUs}/1`);
    return response.data;
  },
);

export const createAboutUs = createAsyncThunk(
  "aboutUs/createAboutUs",
  async (aboutUsData: { motor: string; company_description: string }) => {
    const response = await client.post(Endpoints.aboutUs, aboutUsData);
    return response.data;
  },
);

export const updateAboutUs = createAsyncThunk(
  "aboutUs/updateAboutUs",
  async (aboutUsData: {
    id: number;
    motor: string;
    company_description: string;
  }) => {
    const response = await client.put(
      `${Endpoints.aboutUs}/${aboutUsData.id}/`,
      aboutUsData,
    );
    return response.data;
  },
);

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUsState>) => {
          state.status = "succeeded";
          state.id = action.payload.id;
          state.file = action.payload.file;
          state.motor = action.payload.motor;
          state.company_description = action.payload.company_description;
        },
      )
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUsState>) => {
          state.status = "succeeded";
          state.id = action.payload.id;
          state.file = action.payload.file;
          state.motor = action.payload.motor;
          state.company_description = action.payload.company_description;
        },
      )
      .addCase(createAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateAboutUs.fulfilled,
        (state, action: PayloadAction<AboutUsState>) => {
          state.status = "succeeded";
          state.id = action.payload.id;
          state.file = action.payload.file;
          state.motor = action.payload.motor;
          state.company_description = action.payload.company_description;
        },
      )
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default aboutUsSlice.reducer;
