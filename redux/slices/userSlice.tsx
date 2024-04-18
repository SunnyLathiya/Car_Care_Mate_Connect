
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
import axios from 'axios';
import Cookies from 'js-cookie'; 

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData: User, { rejectWithValue }) => {
      try {
        const createUser = await axios.post(`http://localhost:3000/api/v1/user/register`, eval)
        // ToastSuccess(createUser.data.message)

        return createUser.data
      } catch (error : any) {
        return rejectWithValue(error.response.data);
      }
    }
  ) ;


export const login = createAsyncThunk(
    'user/login',
    async (userData: any, { rejectWithValue }) => {
      try {
          console.log(userData)
        const createUser = await axios.post(`http://localhost:4000/api/v1/login`, userData)
        // ToastSuccess(createUser.data.message)
        return createUser.data
      } catch (error : any) {
        console.log("object")
        return rejectWithValue(error.response.data);
      }
    }
  ) ;

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token:string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  token:""
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;    
        console.log(action.payload)
        state.token=action.payload.token;
        Cookies.set('token', action.payload.token);

      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

