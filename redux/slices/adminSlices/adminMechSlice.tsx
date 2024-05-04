"use client"
import { ToastError, ToastSuccess } from '@/components/common/Toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const getAllMechanics = createAsyncThunk(
    'admin/allmechanics',
    async (allmechanicsDetails: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.post(`http://localhost:4000/api/v1/admin/findall`, allmechanicsDetails, { headers: {
                Authorization: `Bearer ${token}`, // Send token in the Authorization header
              },});
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const getAllAvailableMechanics = createAsyncThunk(
    'admin/allavailablemechanics',
    async (mechanicsList: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(
                'http://localhost:4000/api/v1/admin/findavailable',
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
            ToastSuccess(' Now Available mechanics List!');
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const deleteMechanic = createAsyncThunk(
    'mechanic/delete',
    async (mechId: string) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`http://localhost:4000/api/v1/admin/deletemechanic/${mechId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            ToastSuccess("Mechanic account deleted successfully!")
            return mechId; 
        } catch (error: any) {
            ToastError("Error in mechanic account delete!");
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);



const initialState = {
    allmechanics: [],
    loading: false,
    error: null as string | null,
};

const AdminMecSlice = createSlice({
    name: 'adminMic',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllMechanics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMechanics.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allmechanics = action.payload;
                console.log(action.payload)
            })
            .addCase(getAllMechanics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            })
            .addCase(getAllAvailableMechanics.pending, (state) => {
                state.loading = true;
                state.error = null;
                console.log("hello1")
            })
            .addCase(getAllAvailableMechanics.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allmechanics = action.payload.mechanicsList;
                // console.log("1", action.payload)
                // console.log("2", state.allmechanics)
            })
            .addCase(getAllAvailableMechanics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            })
            .addCase(deleteMechanic.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMechanic.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.allmechanics = state.allmechanics.filter((mechanic) => mechanic._id !== action.payload);
            })
            .addCase(deleteMechanic.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete car';
            })
    },
});

export default AdminMecSlice.reducer;
