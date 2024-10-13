import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { client, Endpoints } from "../../api/client";

export interface ContactUsState {
  id?: number;
  your_name: string;
  subject: string;
  email: string;
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ContactUsState = {
  id: 0,
  your_name: "",
  subject: "",
  email: "",
  message: "",
  status: "idle",
  error: null,
}

export const contactUs = createAsyncThunk("contact-us/sendMessage", async (contactUsData: Omit<ContactUsState, "id">) => {
  const response = await client.post(`${Endpoints.contactUs}`, contactUsData);
  return response.data;
})

const contactUsSlice = createSlice({
  name: 'contact_us',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(contactUs.pending, (state) => {
      state.status = "loading";
    }).addCase(contactUs.fulfilled, (state, action: PayloadAction<ContactUsState>) => {
      state.status = "succeeded";
      state.id = action.payload.id;
      state.your_name = action.payload.your_name;
      state.subject = action.payload.subject;
      state.email = action.payload.email;
    }).addCase(contactUs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    })
  }
})


export default contactUsSlice.reducer;
