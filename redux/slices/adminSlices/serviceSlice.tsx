
import { ToastError, ToastInfo, ToastSuccess } from '@/components/common/Toast';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export const getAllServices = createAsyncThunk(
    'services/findallservices',
    async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`http://localhost:4000/api/v1/admin/findallservices`, { headers: {
                Authorization: `Bearer ${token}`,
              },});
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const addService = createAsyncThunk(
    'cars/add',
    async (newService: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.post(`http://localhost:4000/api/v1/admin/addservice`, newService, { headers: {
                Authorization: `Bearer ${token}`,
              },});
              ToastSuccess("New Service added successfully");
            return response.data;
        } catch (error: any) {

            ToastError("Problem in new service create!")
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const deleteService = createAsyncThunk(
    'services/delete',
    async (serviceId: any) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`http://localhost:4000/api/v1/admin/deleteservice/${serviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            ToastSuccess("Service Delete Successfully!");
            return serviceId;
        } catch (error: any) {
            ToastError("Error in Delete New Service!")
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const updateService = createAsyncThunk(
    'services/update',
    async (updatedService: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.patch(`http://localhost:4000/api/v1/admin/updateservice/${updatedService._id}`, updatedService, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            ToastSuccess("Service Updated Successfully!");
            return response.data; 
        } catch (error: any) {
            ToastError("Problem in Service Update!")
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);


const initialState = {
    services: [],
    loading: false,
    error: null as string | null,
};

const serviceSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllServices.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // console.log(action.payload.service)
                state.services = action.payload.service;
                // console.log(state.services)
            })
            .addCase(getAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            })
            .addCase(addService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addService.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.services.push(action.payload.service);
            })
            .addCase(addService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add car';
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteService.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.services = state.services.filter((service) => service._id !== action.payload);
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete car';
            })
            .addCase(updateService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                console.log(state.services)
                console.log(action.payload)
                const index = state.services.findIndex((service) => service._id === action.payload.newservice._id);
                console.log(index)
                if (index !== -1) {
                    state.services[index] = action.payload.newservice;
                }
            })
            .addCase(updateService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update car';
            });
    },
});

export default serviceSlice.reducer;
