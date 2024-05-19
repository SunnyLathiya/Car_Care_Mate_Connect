"use client";
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Car, Service } from "@/app/types";

export const allBrands = createAsyncThunk("brands/allbrands", async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      `http://localhost:4000/api/v1/customer/findallbrands`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    toast.error(" Error in Order page!");
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const fetchCarsByBrand = createAsyncThunk(
  "cars/fetchCarsByBrand",
  async (brand: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/customer/findbybrand',
        { brand }
      );
      return response.data.cars;
    } catch (error: any) {
      toast.error("Error fetching cars!");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

interface BrandState {
  brands: Car[];
  cars: Car[];
  services: Service[];
  fCar: Car[];
  loading: boolean;
  error: string | null;
  totalProfit: number;
}

const initialState: BrandState = {
  brands: [],
  cars: [],
  services: [],
  fCar: [],
  loading: false,
  error: null as string | null,
  totalProfit: 0,
};

const CusFunctionsSlice = createSlice({
  name: "CusFunctions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(allBrands.pending, (state) => {
      state.loading = true;
      state.error = null;
      console.log("hello.........")
    })
    .addCase(allBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.brands = action.payload;
    })
    .addCase(allBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch cars";
    })
    .addCase(fetchCarsByBrand.pending, (state) => {
      state.loading = true;
      state.error = null;
      console.log("111")
    })
    .addCase(fetchCarsByBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
      console.log("222")
    })
    .addCase(fetchCarsByBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      console.log("333")
    });
  },
});

export default CusFunctionsSlice.reducer;

