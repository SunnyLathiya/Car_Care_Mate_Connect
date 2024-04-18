// import Axios from "./Axios";

// export type User = {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword: string;
//     accountType: "Admin" | "Customer" | "Mechanic";
//     additionalDetails?: string | null;
//     profilePhoto: string;
//     orders:string[];
//     token?: string | null;
//     resetPasswordExpires?: Date | null;
//   };

// //register new user API call
//  export const RegisterUser = async (user: User) => {
//     const {data} = await Axios.post("/register", user);
//     if (data) {
//         localStorage.setItem("userInfo", JSON.stringify(data));
//     }
//     return data;
// };

// //login user api call
// export const LoginUser = async (user : User) => {
//     const {data} = await Axios.post("/login", user);
//     if (data) {
//         localStorage.setItem("userInfo", JSON.stringify(data));
//     }
//     return data;
// }

// //logout function
// export const LogoutUser = () => {
//     localStorage.removeItem("userInfo");
//     return null;
// }





