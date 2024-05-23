"use client";
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Car, Service } from "@/app/types";
import Axios from "@/redux/APIs/Axios";

export const allBrands = createAsyncThunk("brands/allbrands", async () => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.get(`/customer/findallbrands`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    ToastError(" Error in Order page!")
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const fetchCarsByBrand = createAsyncThunk(
  "cars/fetchCarsByBrand",
  async (brand: string, { rejectWithValue }) => {
    try {
    const token = Cookies.get("token");
      const response = await Axios.post("/customer/findbybrand", { brand }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.cars;
    } catch (error: any) {
      ToastError("Error fetching cars!")
      return rejectWithValue(error.response?.data.cars || error.message);
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
      })
      .addCase(fetchCarsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;

        console.log("gfchjbknm", action.payload)
      })
      .addCase(fetchCarsByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default CusFunctionsSlice.reducer;
