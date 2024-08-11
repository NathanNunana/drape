import axios from "axios";
import store, { RootState } from "../drape/store";

export const Endpoints = {
  login: "/auth/login/",
  register: "auth/register/",
  aboutUs: "/drape/about-us/",
  address: "/drape/addresses/",
  analytics: "/drape/analytics/",
  products: "/drape/products/",
  services: "/drape/services/",
  serviceTypes: "/drape/service-types/",
  openingHours: "/drape/opening-hours/",
  openingHoursType: "/drape/opening-hours-types/",
};

export const client = axios.create({
  baseURL: "https://yengsebastian1.pythonanywhere.com",
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
