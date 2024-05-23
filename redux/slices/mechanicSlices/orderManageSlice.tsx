"use client"
import { ToastError, ToastSuccess } from '@/components/common/Toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';


// export const findInProcessOrders = createAsyncThunk(
//     'order/findinprocessorders',
//     async (mechanic : any) => {
//         try {
//             const token = Cookies.get('token');

//             const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findInprocessorders/${mechanic._id}`, {
//                      headers: {
//                        Authorization: `Bearer ${token}`,
//                    }});
//             return response.data;
//         } catch (error: any) {
//             toast.error(' Error in Order page!');
//             throw (error as AxiosError).response?.data || error.message;
//         }
//     }
// );


// export const findMyOrders = createAsyncThunk(
//     'order/findmyorders',
//     async (user: any) => {
//         try {
//             const token = Cookies.get('token');
//             const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findInprocessorders/${user.id}`, {
//                      headers: {
//                        Authorization: `Bearer ${token}`,
//                    }});
//             return response.data;
//         } catch (error: any) {
//             toast.error(error.message);
//             throw (error as AxiosError).response?.data || error.message;
//         }
//     }
// );

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const token: string | undefined = Cookies.get('token');
  if (token) {
    const user: any = jwtDecode(token);
    const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findmyorders/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.orders;
  } else {
    throw new Error('Token is undefined');
  }
});


export const findMyOrders = createAsyncThunk(
    'order/findmyorders',
    async (_, { rejectWithValue }) => {
      try {
        const token : any = Cookies.get('token');
        const user: any = jwtDecode(token);
        const response = await axios.get(`http://localhost:4000/api/v1/mechanic/findInprocessorders/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.response;
      } catch (error: any) {
        const err: AxiosError = error;
        return rejectWithValue(err.response?.data || err.message);
      }
    }
  );
  
  export const updateOrder = createAsyncThunk(
    'order/updateOrder',
    async (orderData: { id: string, status: string }, { rejectWithValue }) => {
      try {
        const token = Cookies.get('token');
        const response = await axios.patch(`http://localhost:4000/api/v1/mechanic/updateorder/${orderData.id}`, {
          status: orderData.status,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        ToastSuccess("Order Update Successfully!")
        return response.data.response;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
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
    name: 'orderManage',
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
              state.error = action.error.message ?? 'Failed to fetch orders';
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
                state.error = action.error.message || 'Failed to fetch cars';
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state: any, action) => {
                state.loading = false;
                state.error = null;
                const updatedOrder = action.payload;
                const index = state.allOrders.findIndex((order: { _id: any }) => order._id === updatedOrder._id);
                if (index !== -1) {
                  state.allOrders[index] = updatedOrder;
                }
              })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update order';
            });
        },
});

export default orderManageSlice.reducer;



