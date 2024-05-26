"use client";
import { ToastSuccess } from "@/components/common/Toast";
import Axios from "@/redux/APIs/Axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const token: string | undefined = Cookies.get("token");
  if (token) {
    const user: any = jwtDecode(token);
    const response = await Axios.get(`/mechanic/findmyorders/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders;
  } else {
    throw new Error("Token is undefined");
  }
});

export const findMyOrders = createAsyncThunk(
  "order/findmyorders",
  async (_, { rejectWithValue }) => {
    try {
      const token: any = Cookies.get("token");
      const user: any = jwtDecode(token);

      const response = await Axios.get(
        `/mechanic/findInprocessorders/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("rrrrrrrrrr", response);
      return response.data.response;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (orderData: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.patch(
        `/mechanic/updateorder/${orderData.id}`,
        {
          status: orderData.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // ToastSuccess("Order Update Successfully!")
      return response.data.response;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

const initialState = {
  mechanicorders: [],
  allOrders: [],
  loading: false,
  error: null as string | null,
};

const orderManageSlice = createSlice({
  name: "orderManage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.mechanicorders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(findMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allOrders = action.payload;
      })
      .addCase(findMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state: any, action) => {
        state.loading = false;
        state.error = null;
        const updatedOrder = action.payload;

        if (!updatedOrder || !updatedOrder._id) {
          state.error = "Updated order is invalid";
          return;
        }

        const index = state.allOrders.findIndex(
          (order: { _id: any }) => order && order._id === updatedOrder._id
        );

        if (index !== -1) {
          state.allOrders[index] = updatedOrder;
        } else {
          state.error = "Order not found";
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update order";
      });
  },
});

export default orderManageSlice.reducer;
