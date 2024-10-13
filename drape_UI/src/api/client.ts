import axios from "axios";
import store, { RootState } from "../drape/store";

export const Endpoints = {
  login: "/auth/login/",
  register: "auth/register/",
  activate: (uidb64: string, token: string) => `/auth/activate/${uidb64}/${token}/`,
  aboutUs: "/about-us/",
  address: "/addresses/",
  analytics: "/analytics/",
  products: "/products/",
  services: "/services/",
  serviceTypes: "/service-types/",
  openingHours: "/opening-hours/",
  openingHoursType: "/opening-hours-types/",
  contactUs: "/contact-us/",
};

export const client = axios.create({
  baseURL: "https://yeng1.pythonanywhere.com/api",
  // baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const state: RootState = store.getState();
    const accessToken = state.auth.tokens?.access;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      localStorage.clear();
    }
    return response;
  },
  (error) => {
    return Promise.reject(error)
  }
)
