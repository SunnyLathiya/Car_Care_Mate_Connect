// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { userLoginReducer, userRegisterReducer } from "./Reducers/userReducers";

// interface UserInfo {
//   name: string;
//   email: string;
// }

// const rootReducer = combineReducers({

//   //user reducers
//   userLogin: userLoginReducer,
//   userRegister: userRegisterReducer
// });

// // get userInfo from localStorage
// // const userInfoFromStorage: UserInfo | null = localStorage.getItem("userInfo")
// //   ? JSON.parse(localStorage.getItem("userInfo")!)
// //   : null ;


// //initialstate
// // const initialstate = {
// //   userLogin: { }
// // };

// export const store = configureStore({
//   reducer: rootReducer,
//   // preloadedState: initialstate
// })



import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import carSlice from './slices/carSlice';
import serviceSlice from './slices/serviceSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    car: carSlice,
    service: serviceSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
