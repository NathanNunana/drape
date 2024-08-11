import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/admin/auth/authSlice";
import {
  aboutUsReducer,
  addressesReducer,
  analyticsReducer,
  servicesReducer,
  productsReducer,
  openingHoursReducer,
  serviceTypesReducer,
} from "../pages/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    aboutUs: aboutUsReducer,
    addresses: addressesReducer,
    analytics: analyticsReducer,
    services: servicesReducer,
    products: productsReducer,
    openingHours: openingHoursReducer,
    serviceTypes: serviceTypesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
