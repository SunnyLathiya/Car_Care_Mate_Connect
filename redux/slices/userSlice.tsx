import { createAsyncThunk, createSlice, PayloadAction , AsyncThunkAction} from '@reduxjs/toolkit';
import { User } from '../../app/types';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode';
import { ToastSuccess, ToastError } from '@/components/common/Toast';
import { RootState } from '../store';
import { toast } from 'react-toastify';
 
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: User) => {
      console.log("1")
      try {
        console.log("2")
        const createUser = await axios.post(`http://localhost:4000/api/v1/register`, userData)
        // ToastSuccess(createUser.data.message)

        console.log(createUser)

        console.log("helloo")


        return createUser.data
      } catch (error : any) {
        // return rejectWithValue(error.response.data);
        console.log("ghfvhbjnhgcfhvjb")
        return error;
      }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (userData: User, { rejectWithValue }) => {
      try {
        const createUser = await axios.post(`http://localhost:4000/api/v1/login`, userData)
        //ToastSuccess(createUser.data.message)
         return createUser.data
      } catch (error : any) {
        console.log("object")
        return rejectWithValue(error.response.data);
      }
    }
  );

export const getProfile = createAsyncThunk<User>(
    'profile/',
    async () => {
        try {
            const token = Cookies.get('token');
            const response = await axios.get(`http://localhost:4000/api/v1/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
            }});

            // console.log("res..........", response)
            return response.data;
        } catch (error: any) {
            throw (error as AxiosError).response?.data || error.message;
        }
    }
);

// export const updateProfile = createAsyncThunk(
//   'services/update',
//   async () => {
//       try {
//           const token = Cookies.get('token');
//           const response = await axios.patch(`http://localhost:4000/api/v1/updatedProfile/6617e48588af7a1cd3fa6d8c`, , {
//               headers: {
//                   Authorization: `Bearer ${token}`,
//               },
//           });
//           ToastSuccess("Service Updated Successfully!");
//           return response.data; 
//       } catch (error: any) {
//           ToastError("Problem in Service Update!")
//           throw (error as AxiosError).response?.data || error.message;
//       }
//   }
// );

// export const updateProfile = createAsyncThunk(
//   'user/updateProfile',
//   async (updatedUser: User, { rejectWithValue, getState }) => {
//     try {
//       const token = Cookies.get('token'); 
//       const state: RootState = getState() as RootState; // Type assertion to RootState
//       // const { token, user } = state.user;

//       const userId = state.user.user._id;

//       const response = await axios.put(`http://localhost:4000/api/v1/updatedProfile/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log(response)

//       ToastSuccess('Profile Updated Successfully!');
//       return response.data; // Return updated profile data
//     } catch (error: any) {
//       console.log(error)
//       // ToastError('Problem in updating profile!');
//       return rejectWithValue(error.response?.data || error.message); // Return error message
//     }
//   }
// );

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (updatedUser: User, { rejectWithValue, getState }) => {
    try {
      const token = Cookies.get('token');

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const state = getState() as RootState;
      const userId = state.user.user?._id;

      if (!userId) {
        throw new Error('User ID not found in state');
      }

      const response = await axios.put(
        `http://localhost:4000/api/v1/updatedProfile/${userId}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      ToastSuccess('Profile Updated Successfully!');
      return response.data.profile;
    } catch (error: any) {
      ToastError('Problem in updating profile!');
      return rejectWithValue(error.response?.data || error.message); // Return error message
    }
  }
);

export const allUsers = createAsyncThunk<User>(
  'order/allusers',
  async () => {
      try {
          const token = Cookies.get('token');
          const response = await axios.get(`http://localhost:4000/api/v1/allusers`, {
                   headers: {
                     Authorization: `Bearer ${token}`,
                 }});
          return response.data;
      } catch (error: any) {
          throw (error as AxiosError).response?.data || error.message;
      }
  }
);

interface UserState {
  _id: any;
  user: User | null;
  loading: boolean;
  error: string | null;
  token:string;
  carSelected: string;
  accountType: string;
  profile: string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  token:"",
  carSelected: "",
  accountType: "",
  profile: "",
  _id: ""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCarSelected: (state, action: PayloadAction<string>) => {
      state.carSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: any, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload.user;    
        state._id=action.payload.user._id
        state.user.token=action.payload.token;
        Cookies.set('token', action.payload.token);
        const decodedToken : any = jwtDecode(action.payload.token);
        state.accountType = decodedToken.accountType;
      })
      .addCase(login.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
      .addCase(getProfile.fulfilled, (state: any, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
    })
    .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cars';
    })

    .addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update profile';
    })
    .addCase(allUsers.pending, (state, action) => {
      state.loading = true;
      state.error = null;
  })
  .addCase(allUsers.fulfilled, (state, action: any) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.users;
  })
  .addCase(allUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cars';
  })
  }
});


export const { setCarSelected } = userSlice.actions;
export default userSlice.reducer;

