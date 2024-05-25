interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export const validateForm = (formData: RegisterFormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName) {
    errors.firstName = "First Name is required";
  } else if (formData.firstName.length < 2) {
    errors.firstName = "First Name should be at least 2 characters";
  } else if (!/^[a-zA-Z\-]+$/.test(formData.firstName)) {
    errors.firstName = "First Name should only contain letters and hyphens";
  }

  if (!formData.lastName) {
    errors.lastName = "Last Name is required";
  } else if (formData.lastName.length < 2) {
    errors.lastName = "Last Name should be at least 2 characters";
  } else if (!/^[a-zA-Z\-]+$/.test(formData.lastName)) {
    errors.lastName = "Last Name should only contain letters and hyphens";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
    errors.password =
      "Password must contain at least one uppercase letter, one lowercase letter, and one digit";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
