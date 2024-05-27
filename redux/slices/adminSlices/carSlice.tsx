"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ToastSuccess } from "@/components/common/Toast";
import { Car } from "@/app/types";
import Axios from "@/redux/APIs/Axios";

export const getAllCars = createAsyncThunk<Car[]>("cars/getAll", async () => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.get(`/admin/findallcars`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const addCar = createAsyncThunk("cars/add", async (newCar: Car) => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.post(`/admin/addcar`, newCar, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ToastSuccess(response.data.message);
    return response.data;
  } catch (error: any) {
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const deleteCar = createAsyncThunk("cars/delete", async (carId: any) => {
  try {
    const token = Cookies.get("token");
    const response =await Axios.delete(`/admin/deletecar/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ToastSuccess(response.data.message);
    return carId;
  } catch (error: any) {
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const updateCar = createAsyncThunk(
  "cars/update",
  async (updatedCar: Car) => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.patch(
        `/admin/updatecar/${updatedCar._id}`,
        updatedCar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      ToastSuccess(response.data.message);
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

interface cardata {
  cars: Car[];
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: cardata = {
  cars: [],
  loading: false,
  error: null,
  success: false,
};

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCars.fulfilled, (state: cardata, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.cars = action.payload;
      })
      .addCase(getAllCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cars.push(action.payload.car);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add car";
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cars = state.cars.filter(
          (car: Car) => car._id !== action.payload
        );
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete car";
      })
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.cars.findIndex(
          (car: Car) => car._id === action.payload.newcar._id
        );
        if (index !== -1) {
          state.cars[index] = action.payload.newcar;
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update car";
      });
  },
});

export default carSlice.reducer;