
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
// import { ToastError, ToastSuccess } from '@/components/custom-error/toast';
import Cookies from 'js-cookie';

export const getAllCars = createAsyncThunk(
    'cars/getAll',
    async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/admin/findallcars`);
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const addCar = createAsyncThunk(
    'cars/add',
    async (newCar: any) => {
        try {

            const token = Cookies.get('token');
            const response = await axios.post(`http://localhost:4000/api/v1/admin/addcar`, newCar, { headers: {
                Authorization: `Bearer ${token}`, // Send token in the Authorization header
              },});
            // ToastSuccess('Car added successfully');

            console.log(response)
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const deleteCar = createAsyncThunk(
    'cars/delete',
    async (carId: any) => {
        try {
            const token = Cookies.get('token');
            await axios.delete(`http://localhost:4000/api/v1/admin/deletecar/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return carId; // Return the ID of the deleted car upon successful deletion
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

export const updateCar = createAsyncThunk(
    'cars/update',
    async (updatedCar: any) => {
        try {
            const token = Cookies.get('token');
            const response = await axios.patch(`http://localhost:4000/api/v1/admin/updatecar/${updatedCar._id}`, updatedCar, {
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
    cars: [],
    loading: false,
    error: null as string | null,
};

const carSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cars = action.payload;
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cars';
            })
            .addCase(addCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cars.push(action.payload.car);
            })
            .addCase(addCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add car';
            })
            .addCase(deleteCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.cars = state.cars.filter((car) => car._id !== action.payload);
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete car';
            })
            .addCase(updateCar.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Find the index of the updated car and replace it with the updated data

                console.log(state.cars)
                console.log(action.payload)
                const index = state.cars.findIndex((car) => car._id === action.payload.newcar._id);
                console.log(index)
                if (index !== -1) {
                    state.cars[index] = action.payload.newcar;
                }
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update car';
            });
    },
});

export default carSlice.reducer;
