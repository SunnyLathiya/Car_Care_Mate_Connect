import { ToastError, ToastSuccess } from "@/components/common/Toast";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { User } from "@/app/types";
import Axios from "@/redux/APIs/Axios";

export const getAllMechanics = createAsyncThunk(
  "admin/allmechanics",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get(`/admin/findall`, {
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

export const getAllAvailableMechanics = createAsyncThunk(
  "admin/allavailablemechanics",
  async () => {
    try {
      const token = Cookies.get("token");
      const response = await Axios.get("/admin/findavailable", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      ToastError(error.response.data.message);
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

export const deleteMechanic = createAsyncThunk(
  "mechanic/delete",
  async (mechId: User) => {
    try {
      const token = Cookies.get("token");
      await Axios.delete(`/admin/deletemechanic/${mechId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      ToastSuccess("Mechanic account deleted successfully!");
      return mechId;
    } catch (error: any) {
      ToastError(error.response.data.message);
      throw (error as AxiosError).response?.data || error.message;
    }
  }
);

interface MechanicsState {
  mechanicsList: any[];
  allmechanics: any[];
  loading: boolean;
  error: string | null;
}

const initialState: MechanicsState = {
  allmechanics: [],
  loading: false,
  error: null,
  mechanicsList: [],
};

const AdminMecSlice = createSlice({
  name: "adminMic",
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
        state.allmechanics = action.payload.allmechanicsDetails;
      })
      .addCase(getAllMechanics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(getAllAvailableMechanics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllAvailableMechanics.fulfilled,
        (state, action: PayloadAction<MechanicsState>) => {
          state.loading = false;
          state.error = null;
          state.allmechanics = action.payload.mechanicsList;
        }
      )
      .addCase(getAllAvailableMechanics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cars";
      })
      .addCase(deleteMechanic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMechanic.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allmechanics = state.allmechanics.filter(
          (mechanic: any) => mechanic._id !== action.payload
        );
      })
      .addCase(deleteMechanic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete car";
      });
  },
});

export default AdminMecSlice.reducer;
