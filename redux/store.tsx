import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import carSlice from "./slices/adminSlices/carSlice";
import serviceSlice from "./slices/adminSlices/serviceSlice";
import adminMechSlice from "./slices/adminSlices/adminMechSlice";
import orderSlice from "./slices/adminSlices/orderSlice";
import cusFunctionsSlice from "./slices/customer/cusFunctionsSlice";
import orderManageSlice from "./slices/mechanicSlices/orderManageSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    car: carSlice,
    service: serviceSlice,
    adminMech: adminMechSlice,
    order: orderSlice,
    cusFunctions: cusFunctionsSlice,
    ordermanage: orderManageSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
