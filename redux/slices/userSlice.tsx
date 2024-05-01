
// import { createSlice, current, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// interface User {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     accountType: "Admin" | "Customer" | "Mechanic";
//     additionalDetails?: string | null;
//     profilePhoto: string;
//     orders: string[];
//     token?: string | null;
//     resetPasswordExpires?: Date | null;
// }

// interface UserState {
//   users: User[];
// }

// // Handle null case for localStorage.getItem()
// const initialState = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
// }

// interface RegisterResponse {
//     message: string;
//   }

// export const userRegister = createAsyncThunk(
//     'userRegister',
//     async (val: User) => {
//         try {
//             const createUser = await axios.post(`http://localhost:4000/api/v1/register`, val)
//             // ToastSuccess(createUser.data.message)
//             return createUser.data as  RegisterResponse;
//         } catch (error: any) {
//             console.log(error.response.data?.email[0]);
//             // ToastError(error.response.data.message)
//             // ToastError(error.response.data?.email[0])
//             throw error.response.data?.email[0]
//         }
//     }
// )

// // export const userLogin = createAsyncThunk('userLogin', async (val: object) => {
// //     try {
// //         const existingUser = await axios.post(``, val)
// //         const data = await existingUser.data
// //         // ToastSuccess(data.message)
// //         return data
// //     } catch (error: any) {

// //         console.log(error.response.data.errors);

// //         // ToastError(error.response.data.message)
// //         throw error.response.data.errors
// //     }
// // })

// const userSlice: any = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     addUser: (state, action: PayloadAction<User>) => {

//         console.log(action)
//     //   state.users.push(action.payload);
//     //   let userData = JSON.stringify(current(state.users));
//     //   localStorage.setItem("users", userData);
//     }
//   },
//   extraReducers: (builder: any) => {
//     builder
//         .addCase(userRegister.pending, (state: any) => {
//             state.status = 'loading'
//         })
//         .addCase(userRegister.fulfilled, (state: any, action: any) => {
//             state.status = 'succeeded'
//             state.token = action.payload.tokens?.access
//         })
//         .addCase(userRegister.rejected, (state: any, action: any) => {
//             state.status = 'failed'
//             // console.log(action);
//         })
//         // .addCase(userLogin.pending, (state: any) => {
//         //     state.status = 'loading'
//         // })
//         // .addCase(userLogin.fulfilled, (state: any, action: any) => {
//         //     state.status = 'succeeded'
//         //     // console.log(action.payload.message)
//         //     state.token = action.payload.tokens?.access
//         // })
//         // .addCase(userLogin.rejected, (state: any, action: any) => {
//         //     state.status = 'failed'
//         //     console.log(action.error.errors);
//         //     state.error = action.error
//         // })




// },
// });

// export const { addUser } = userSlice.actions;
// export default userSlice.reducer;



import { createAsyncThunk, createSlice, PayloadAction , AsyncThunkAction} from '@reduxjs/toolkit';
import { User } from '../../app/types';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie'; 
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { ToastSuccess, ToastError } from '@/components/common/Toast';
import { RootState } from '../store';

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: any) => {
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
        return error;
      }
    }
  ) ;


export const login = createAsyncThunk(
    'user/login',
    async (userData: any, { rejectWithValue }) => {
      try {
        console.log(userData)
        const createUser = await axios.post(`http://localhost:4000/api/v1/login`, userData)
        //ToastSuccess(createUser.data.message)
         return createUser.data
      } catch (error : any) {
        console.log("object")
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const getProfile = createAsyncThunk(
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
      const token = Cookies.get('token'); // Retrieve token from cookies

      if (!token) {
        throw new Error('Authentication token not found');
      }

      const state = getState() as RootState; // Type assertion to RootState
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
      return response.data; // Return updated profile data
    } catch (error: any) {
      console.log(error);
      ToastError('Problem in updating profile!');
      return rejectWithValue(error.response?.data || error.message); // Return error message
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
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;    
        console.log(state.user.token)
        console.log(action.payload)
        state._id=action.payload.user._id
        state.user.token=action.payload.token;
        console.log("fgsdg", state.user.token)
        Cookies.set('token', action.payload.token);

        console.log(state.token)

        const decodedToken = jwtDecode(action.payload.token);
        console.log("decodedtoken", decodedToken);
        state.accountType = decodedToken.accountType;
        console.log(state.accountType);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload;
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.profile = action.payload;
        state.user = action.payload.data;
        // console.log("hello.................", action.payload.data)
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
      state.user = action.payload; // Assuming the response contains updated user data
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update profile';
    });
     
  },
});


export const { setCarSelected } = userSlice.actions;

export default userSlice.reducer;

