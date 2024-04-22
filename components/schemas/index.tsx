import * as Yup from "yup";

// export const signUpSchema = Yup.object({
//   firstName: Yup.string().min(2).max(25).required("Please enter your firstName"),
//   lastName: Yup.string().min(2).max(25).required("Please enter your lastName"),
//   email: Yup.string().email().required("Please enter your email"),
//   password: Yup.string().min(6).required("Please enter your password"),
//   confirm_password: Yup.string()
//     .required()
//     .oneOf([Yup.ref("password")], "Password must match"),
// });


export const signUpSchema = Yup.object({
  firstName: Yup.string().min(2).max(25).required("Please enter your firstName"),
  lastName: Yup.string().min(2).max(25).required("Please enter your lastName"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password must match"),
});
