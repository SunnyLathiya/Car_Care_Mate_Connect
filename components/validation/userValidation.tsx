import { FaOldRepublic } from "react-icons/fa";
import * as yup from "yup";

// User Login validation
export const LoginValidation = yup.object().shape({
  username: yup.string().email().required("Email is required").trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(21, "Password must be less than 21 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain upper and lower letters numbers and special characters"
    )
    .required("Password is required")
    .trim(),
});

// User Registration validation
export const UserValidation = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(50, "First name must be less than 51 characters")
      .matches(/^[a-zA-Z ]*$/, "First name must contain only letters")
      .trim(),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(50, "Last name must be less than 51 characters")
      .matches(/^[a-zA-Z ]*$/, "Last name must contain only letters")
      .trim(),
    email: yup.string().email().required("Email is required").trim(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be less than 21 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required")
      .trim(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required')
      .trim(),
  });
  

// export const ProfileValidation = yup.object().shape({
//   fullName: yup
//     .string()
//     .required("Name is required")
//     .min(3, "Name must be at least 3 characters")
//     .max(51, "Name must be less than 51 characters")
//     .matches(/^[a-zA-Z ]*$/, "Name must contain only letters")
//     .trim(),
//   email: yup.string().email().required("Email is required").trim(),
// });

// export const ChangePasswordValidation = yup.object().shape({
//   oldPassword: yup.string().required("oldPassword is required").trim(),
//   newPassword: yup
//     .string()
//     .required("newPassword is required")
//     .min(6, "newPassword must be at least 6 characters")
//     .max(21, "newPassword must be less than 21 characters")
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
//       "Password must contain letters numbers and special characters"
//     )
//     .trim(),
//   confirmPassword: yup
//     .string()
//     .required("confirmPassword is required")
//     .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
//     .trim(),
// });
