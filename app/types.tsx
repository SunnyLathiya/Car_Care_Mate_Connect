export type User = {
  user: any;
  firstName?: string;
  lastName?: string;
  email?: string;
  // image?: string;
  password?: string;
  confirmPassword?: string;
  token: string;
  _id: string;
  username?: string;
  accountType?: "Admin" | "Customer" | "Mechanic";
  profilePhoto?: string;
  phoneNumber?: string;
  orders?: string[];
  resetPasswordExpires?: Date | null;
  id?: string;
  carSelected?: string[];
  mechName?: string;
  address?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  yourCar?: string[];
  favouriteCar?: string[];
  // isAdmin?: boolean;
  // _id?: string;
  // token?: string;
  // createdAt?: string;
  // updatedAt?: string;
  data: string;
};

export type Car = {
  name: string;
  brand: string;
  _id: string;
};

export type Service = {
  service(service: any): unknown;
  serviceType: string;
  name: string;
  price: number;
  description: string;
  timeRequired: string;
  where: string;
};

export type Order = {
  customerId: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
  mechanicId: string;
  requestedOn: Date;
  deliveredOn?: Date;
  status: string;
  value: string;
};

export type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type RowsType = {
  data: any;
  users: any;
  onEditFunction?: any;
  onDeleteFunction?: any;
};
