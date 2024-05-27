export const validateProfile = (formValues: {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  yourCar: string;
  favouriteCar: string;
  address: string;
  zipcode: string;
  country: string;
  state: string;
}) => {
  const errors: any = {};

  if (!formValues.firstName) {
    errors.firstName = "First name is required";
  }

  if (!formValues.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!formValues.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(formValues.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits";
  }

  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }

  if (!formValues.address) {
    errors.address = "Address is required";
  }

  if (!formValues.zipcode) {
    errors.zipcode = "Zip code is required";
  }

  if (!formValues.country) {
    errors.country = "Country is required";
  }

  if (!formValues.state) {
    errors.state = "State is required";
  }

  return errors;
};
