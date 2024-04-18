// import * as userConstants from "../Constants/userConstant";
// import * as userApi from "../APIs/userServices";
// import { Dispatch } from "redux";
// import { ErrorsAction } from "../Reducers/Protection";
// import toast from 'react-hook-toast';

// interface User{
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     // accountType: "Admin" | "Customer" | "Mechanic";
//     // additionalDetails?: string | null;
//     // profilePhoto: string;
//     // orders:string[];
//     // token?: string | null;
//     // resetPasswordExpires?: Date | null;
//   };

// // When User Login Then Take Action
// export const LoginAction = (datas: User ) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({ type: userConstants.USER_LOGIN_REQUEST });
//       const response = await userApi.LoginUser(datas);
//       dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
//     } catch (error: any) {
//       ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
//     }
//   };
  
//   // When User Register Then Take Action
//   export const RegisterAction = (datas: User) => async (dispatch: Dispatch) => {
//     try {
//       dispatch({ type: userConstants.USER_REGISTER_REQUEST });
//       const response = await userApi.RegisterUser(datas);
//       dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
//     } catch (error: any) {
//       ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
//     }
//   };


//   //logout action
//   export const LogoutAction = () => async (dispatch: Dispatch) => {
//     userApi.LogoutUser();
//     dispatch({ type: userConstants.USER_LOGOUT});
//     dispatch({ type: userConstants.USER_LOGIN_RESET});
//     dispatch( { type: userConstants.USER_REGISTER_RESET});
//   }

