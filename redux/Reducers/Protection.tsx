import { get } from "http";
import { LogoutAction } from "../Actions/userActions";

interface ErrorResponse {
  response?: {
    data?: {
      message: string;
    };
  };
  message: string;
}

export const ErrorsAction = (
  error: ErrorResponse,
  dispatch: any,
  action: any
) => {
  const message =
    error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(LogoutAction());
  }
  return dispatch({ type: action, payload: message });
};

// API Token protection
// export const tokenProtection = (getState: object | any) => {
//   const {
//     userLogin: { userInfo },
//   } = getState();
//   if (!userInfo?.token) {
//     return null;
//   } else {
//     return userInfo?.token;
//   }
// };
