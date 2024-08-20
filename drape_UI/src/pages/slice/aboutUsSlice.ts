import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface AboutUsState {
  id: number;
  image: string | null;
  motto: string;
  company_description: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AboutUsState = {
  id: 0,
  image: null,
  motto: "",
  company_description: "",
  status: "idle",
  error: null,
};

export const fetchAboutUs = createAsyncThunk(
  "aboutUs/fetchAboutUs",
  async () => {
    const response = await client.get(`${Endpoints.aboutUs}?ordering=-id`);
    return response.data[0];
  }
);

export const createAboutUs = createAsyncThunk(
  "aboutUs/createAboutUs",
  async (aboutUsData: { motto: string; company_description: string; image?: File }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(aboutUsData).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append(key, value as Blob);
        } else if (key !== 'image') {
          formData.append(key, value as string);
        }
      });

      const response = await client.post(Endpoints.aboutUs, formData, {
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

export const updateAboutUs = createAsyncThunk(
  "aboutUs/updateAboutUs",
  async (aboutUsData: {
    id: number;
    motto: string;
    company_description: string;
    image?: File;
  }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.entries(aboutUsData).forEach(([key, value]) => {
        if (key === 'image' && value) {
          formData.append(key, value as Blob);
        } else if (key !== 'image') {
          formData.append(key, value as string);
        }
      });

      const response = await client.put(
        `${Endpoints.aboutUs}${aboutUsData.id}/`,
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

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutUs.fulfilled, (state, action: PayloadAction<AboutUsState>) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.image = action.payload.image;
        state.motto = action.payload.motto;
        state.company_description = action.payload.company_description;
      })
      .addCase(fetchAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(createAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createAboutUs.fulfilled, (state, action: PayloadAction<AboutUsState>) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.image = action.payload.image;
        state.motto = action.payload.motto;
        state.company_description = action.payload.company_description;
      })
      .addCase(createAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || null;
      })
      .addCase(updateAboutUs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAboutUs.fulfilled, (state, action: PayloadAction<AboutUsState>) => {
        state.status = "succeeded";
        state.id = action.payload.id;
        state.image = action.payload.image;
        state.motto = action.payload.motto;
        state.company_description = action.payload.company_description;
      })
      .addCase(updateAboutUs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string || null;
      });
  },
});

export default aboutUsSlice.reducer;
