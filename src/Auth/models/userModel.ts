import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: "Admin" | "Customer" | "Mechanic";
  additionalDetails?: mongoose.Schema.Types.ObjectId | null;
  profilePhoto: string;
  number: string;
  orders:string[];
  token?: string | null;
  resetPasswordExpires?: Date | null;
  id: string;
}

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    // required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    // required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 200,
  },
  confirmPassword: {
    type: String,
    // required: true,
    minLength: 8,
    maxLength: 200,
  },
  number: {
    type: String,
    // required: true,
    trim: true,
    match: /^\d{10}$/
},
  accountType: {
    type: String,
    enum: ["Admin", "Customer", "Mechanic"],
    default: "Customer",
    // required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  profilePhoto: {
    type: String,
    // required: true,
    trim: true,
    maxLength: 255,
  },
  carselect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  status: { 
    type: String, 
    default: 'AVAILABLE' 
  },
  token: {
    type: String,
    maxLength: 1000, 
  },
  resetPasswordExpires: {
    type: Date,
  },
  id: {
    type: Number,
  },
  mechName: {
    type: String,
    // required: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
});

export default mongoose.model<User>("User", userSchema);

export {User};
