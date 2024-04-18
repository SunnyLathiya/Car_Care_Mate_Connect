// import { userInfo } from 'os';
// import * as userConstant from '../Constants/userConstant';
// import { error } from 'console';

// // Register

// export const userRegisterReducer = (state = {}, action: any) => {
//     switch (action.type) {
//       case userConstant.USER_REGISTER_REQUEST:
//         return { isLoading: true };
//       case userConstant.USER_REGISTER_SUCCESS:
//         return { isLoading: false, userInfo: action.payload, isSuccess: true };
//       case userConstant.USER_REGISTER_FAIL:
//         return { isLoading: false, isError: action.payload };
//       case userConstant.USER_REGISTER_RESET:
//         return {};
//       default:
//         return state;
//     }
//   };


// //login
// export const userLoginReducer = (state ={}, action: any) => {
//     switch(action.type){
//         case userConstant.USER_LOGIN_REQUEST: 
//            return { isLoading : true};
//         case userConstant.USER_LOGIN_SUCCESS: 
//            return { isLoading : false, userInfo: action.payload, isSuccess: true };
//         case userConstant.USER_LOGIN_FAIL: 
//            return { isLoading : false, isError: action.payload};
//         case userConstant.USER_LOGIN_RESET: 
//            return {}; 
//         case userConstant.USER_LOGOUT: 
//            return {}; 
//         default: 
//            return state;
//     }
// }