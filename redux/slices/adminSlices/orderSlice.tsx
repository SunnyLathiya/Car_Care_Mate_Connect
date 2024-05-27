"use client";
import { ToastError } from "@/components/common/Toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Order } from "@/app/types";
import Axios from "@/redux/APIs/Axios";

export const findPlacedOrders = createAsyncThunk(
  "order/findplacedorders",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get(`/admin/findplacedorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      ToastError(error.response.data.message)
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const allorders = createAsyncThunk("order/allorders", async () => {
  try {
    const token = Cookies.get("token");
    const response = await Axios.get(`/admin/allorders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw (error as AxiosError).response?.data || error.message;
  }
});

export const findCompletedOrders = createAsyncThunk(
  "order/findcompletedorders",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get(`/admin/findcompletedorders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const findCompletedOrdersProfit = createAsyncThunk(
  "order/findCompletedOrdersProfit",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get(`/admin/findcompletedordersprofit`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

interface OrderState {
  orders: Order[];
  completedOrders: Order[];
  placedorders: Order[];
  loading: boolean;
  error: string | null;
  totalProfit: number;
}

const initialState: OrderState = {
  orders: [],
  completedOrders: [],
  placedorders: [],
  loading: false,
  error: null as string | null,
  totalProfit: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allorders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allorders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.response;
      })
      .addCase(allorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(findPlacedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findPlacedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.placedorders = action.payload.response;
      })
      .addCase(findPlacedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(findCompletedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findCompletedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.completedOrders = action.payload.completedOrders;
      })
      .addCase(findCompletedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(findCompletedOrdersProfit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findCompletedOrdersProfit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalProfit = action.payload;
      })
      .addCase(findCompletedOrdersProfit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export default orderSlice.reducer;
