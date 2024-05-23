import mongoose, { Schema, Document } from "mongoose";

interface Customer extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  additionalDetails?: mongoose.Schema.Types.ObjectId | null;
  profilePhoto: string;
  token?: string | null;
  resetPasswordExpires?: Date | null;
}

const customerSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
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
    required: true,
    minLength: 8,
    maxLength: 200,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Customer", "Mechanic"],
    default: "Customer",
  },
  profilePhoto: {
    type: String,
    trim: true,
    maxLength: 255,
  },
  token: {
    type: String,
    maxLength: 1000,
  },
  resetPasswordExpires: {
    type: Date,
  },
});

export default mongoose.model<Customer>("Customer", customerSchema);
