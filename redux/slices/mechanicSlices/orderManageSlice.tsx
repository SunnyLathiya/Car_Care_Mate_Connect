"use client"
import { ToastError, ToastSuccess } from '@/components/common/Toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


// findInProcessOrders
// updateOrder
// findMyOrders
// router.patch("/updateorder/:orderId", auth, Mechanic, updateOrder);

// router.get("/findmyorders/:mechId", auth, Mechanic, findMyOrders);


export const findInProcessOrders = createAsyncThunk(
    'order/findinprocessorders',
    async (mechanic : any) => {
        try {
            const token = Cookies.get('token');

            const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findInprocessorders/${mechanic._id}`, {
                     headers: {
                       Authorization: `Bearer ${token}`,
                   }});
            return response.data;
        } catch (error: any) {
            toast.error(' Error in Order page!');
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);


export const findMyOrders = createAsyncThunk(
    'order/findmyorders',
    async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`http://localhost:4000/api/v1/admin/findcompletedorders`, {
                     headers: {
                       Authorization: `Bearer ${token}`,
                   }});
            return response.data;
        } catch (error: any) {
            toast.error(' Error in completed order page!');
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);


export const updateOrder = createAsyncThunk(
    'order/update',
    async (updatedOrder: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.patch(`http://localhost:4000/api/v1/admin/updateOrder/${updatedOrder._id}`, updatedOrder, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            ToastSuccess("Order Status change successfully!")
            return response.data; 
        } catch (error: any) {
            ToastError("Problem in update order status!");
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);


const initialState = {
    orders: [],
    //completedOrders: [],
    loading: false,
    error: null as string | null,
};

const orderManageSlice = createSlice({
    name: 'orderManage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(findPlacedOrders.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(findPlacedOrders.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.error = null;
            //     state.orders = action.payload;
            // })
            // .addCase(findPlacedOrders.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to fetch cars';
            // })
            // .addCase(findCompletedOrders.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(findCompletedOrders.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.error = null;
            //     state.completedOrders = action.payload;
            //     console.log(action.payload)
            //     // console.log(state.orders)
            // })
            // .addCase(findCompletedOrders.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to fetch cars';
            // })
            // .addCase(updateOrder.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(updateOrder.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.error = null;
        
            //     const index = state.orders.findIndex((order) => order._id === action.payload.neworder._id);
            //     if (index !== -1) {
            //         state.orders[index] = action.payload.newcar;
            //     }
            // })
            // .addCase(updateOrder.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.error.message || 'Failed to update order';
            // });
        },
});

export default orderManageSlice.reducer;
