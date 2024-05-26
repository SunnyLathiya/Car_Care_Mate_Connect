import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Service } from "@/app/types";
import Axios from "@/redux/APIs/Axios";

export const getAllServices = createAsyncThunk(
  "services/findallservices",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get(`/admin/findallservices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.services;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const addService = createAsyncThunk<Service, any>(
  "cars/add",
  async (newService) => {
    try {
      const token = Cookies.get("token");

      const response = await Axios.post(`/admin/addservice`, newService, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      ToastSuccess("Service Added Successfully!");
      return response.data;
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/delete",
  async (serviceId: string) => {
    try {
      const token = Cookies.get("token");
      await Axios.delete(`/admin/deleteservice/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      ToastSuccess("Service Delete Successfully!");
      return serviceId;
    } catch (error: any) {
      ToastError("Error in Delete New Service!");
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const updateService = createAsyncThunk(
  "services/update",
  async (updatedService: any, { getState }) => {
    try {
      const currentState: any = getState();
      const token = Cookies.get("token");
      const response = await Axios.patch(
        `/admin/updateservice/${updatedService._id}`,
        updatedService,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const service: any = currentState.service.services;
      const index = service.findIndex((ser: { _id: any }) => {
        return ser._id === response.data.data._id;
      });
      ToastSuccess("Service updated successfully!");
      return { data: response.data.data, index };
    } catch (error: any) {
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

interface Services {
  _id: string;
  name: string;
  price: string;
  description: string;
  timeRequired: string;
  where: string;
  serviceType: string;
}

interface State {
  services: Services[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  services: [],
  loading: false,
  error: null as string | null,
};

const serviceSlice = createSlice({
  name: "services",
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
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(addService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state: any, action) => {
        state.loading = false;
        state.error = null;
        state.services.push(action.payload.service);
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || " to add car";
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.services = state.services.filter(
          (service: { _id: string }) => service._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete car";
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state: State, action) => {
        state.loading = false;
        state.error = null;
        state.services[action.payload.index] = action.payload.data;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update car";
      });
  },
});

export default serviceSlice.reducer;
