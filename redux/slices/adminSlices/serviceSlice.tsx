
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// import { ToastError, ToastSuccess } from '@/components/custom-error/toast';
import Cookies from 'js-cookie';
import {Bounce, toast} from 'react-toastify';

export const getAllServices = createAsyncThunk(
    'services/findallservices',
    async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/admin/findallservices`);
            return response.data;
        } catch (error: any) {
            toast.error('Error in fatch Services Page!');
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
                Authorization: `Bearer ${token}`, // Send token in the Authorization header
              },});
              
              toast.success('New Service added!');

            return response.data;
        } catch (error: any) {

            toast.error('Error in new service create!');
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
            toast.success('Service Delete Successfully!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            return serviceId; // Return the ID of the deleted car upon successful deletion
        } catch (error: any) {
            toast.error('Error in Delete New Service!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
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
            return response.data; 
        } catch (error: any) {
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
