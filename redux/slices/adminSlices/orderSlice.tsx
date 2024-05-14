"use client";
import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Order } from "@/app/types";

export const findPlacedOrders = createAsyncThunk(
  "order/findplacedorders",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:4000/api/v1/admin/findplacedorders`,
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
  }
);

export const allorders = createAsyncThunk("order/allorders", async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(
      `http://localhost:4000/api/v1/admin/allorders`,
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

export const findCompletedOrders = createAsyncThunk(
  "order/findcompletedorders",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:4000/api/v1/admin/findcompletedorders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(" Error in completed order page!");
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "cars/update",
  async (updatedOrder: any) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.patch(
        `http://localhost:4000/api/v1/admin/updateOrder/${updatedOrder._id}`,
        updatedOrder,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("h111", response);
      ToastSuccess("Mechanic Assign Successfully!");
      return response.data;
    } catch (error: any) {
      console.log("h2", error);
      ToastError("Problem in Assign Mechanic!");
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const findCompletedOrdersProfit = createAsyncThunk(
  "order/findCompletedOrdersProfit",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `http://localhost:4000/api/v1/admin/findcompletedordersprofit`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      toast.error(" Error in completed order profit page!");
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

interface OrderState {
  orders: Order[];
  completedOrders: Order[];
  loading: boolean;
  error: string | null;
  totalProfit: number;
}

const initialState: OrderState = {
  orders: [],
  completedOrders: [],
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
      .addCase(findPlacedOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findPlacedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.response;
        console.log(state.orders);
        // console.log("2")
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
        state.completedOrders = action.payload.completedOrder;
        console.log("state.completedOrders", state.completedOrders);
        // console.log(state.orders)
      })
      .addCase(findCompletedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.orders.findIndex(
          (order: any) => order._id === action.payload.neworder._id
        );
        if (index !== -1) {
          state.orders[index] = action.payload.newcar;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      })

      .addCase(findCompletedOrdersProfit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findCompletedOrdersProfit.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.totalProfit = action.payload;
        console.log("profit", action.payload);
        // console.log(state.orders)
      })
      .addCase(findCompletedOrdersProfit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(allorders.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("hello.........")
      })
      .addCase(allorders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload.response;
        console.log(state.orders);
      })
      .addCase(allorders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      });
  },
});

export default orderSlice.reducer;




// enum status {
//   REJECTED ="rejected"
// }