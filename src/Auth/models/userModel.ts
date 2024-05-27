import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "Admin" | "Customer" | "Mechanic";
  profilePhoto: string;
  phoneNumber: string;
  orders: string[];
  token?: string | null;
  resetToken?: string | null;
  resetPasswordExpires?: Date | null;
  id: string;
  carSelected: string[];
  mechName: string;
  address: string;
  zipcode: string;
  state: string;
  country: string;
  yourCar: string[];
  favouriteCar: string[];
  isActive: boolean;
  fcmToken: string;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  username: {
    type: String,
    minLength: 1,
    maxLength: 70,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 200,
  },
  confirmPassword: {
    type: String,
    minLength: 8,
    maxLength: 200,
  },
  phoneNumber: {
    type: String,
    trim: true,
    match: /^\d{10}$/,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Customer", "Mechanic"],
    default: "Customer",
  },
  profilePhoto: {
    type: String,
    trim: true,
  },
  carselect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  status: {
    type: String,
    default: "AVAILABLE",
  },
  token: {
    type: String,
    maxLength: 1000,
  },
  resetToken: {
    type: String,
    maxLength: 1000,
  },
  resetPasswordExpires: {
    type: Date,
  },
  id: {
    type: String,
  },
  mechName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  carSelected: [
    {
      type: String,
    },
  ],
  address: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 255,
  },
  zipcode: {
    type: String,
    trim: true,
    match: /^\d{6}$/,
  },
  state: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  country: {
    type: String,
    trim: true,
    minLength: 1,
    maxLength: 30,
  },
  yourCars: [
    {
      type: String,
      trim: true,
      minLength: 1,
      maxLength: 100,
    },
  ],
  favouriteCar: [
    {
      type: String,
      trim: true,
      minLength: 1,
      maxLength: 100,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  fcmToken: {
    type: String,
    default: null
  }
});

export default mongoose.model<User>("User", userSchema);
export { User };
