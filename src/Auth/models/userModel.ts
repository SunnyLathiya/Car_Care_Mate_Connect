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
  orders:string[];
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
  username: {
    type: String,
    trim: true,
    // required: true,
    minLength: 1,
    maxLength: 70
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    // required: true,
    minLength: 8,
    maxLength: 200,
  },
  confirmPassword: {
    type: String,
    // required: true,
    minLength: 8,
    maxLength: 200,
  },
  phoneNumber: {
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
  // additionalDetails: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Profile",
  // },
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
  resetToken: {
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
  carSelected: [{
    type: String
  }],
  address: {
    type: String,
    // required: true,
    trim: true,
    minLength: 1,
    maxLength: 255,
},
zipcode: {
    type: String,
    // required: true,
    trim: true,
    match: /^\d{6}$/
},
state: {
    type: String,
    // required: true,
    trim: true,
    minLength: 1,
    maxLength: 30
},
country: {
    type: String,
    // required: true,
    trim: true,
    minLength: 1,
    maxLength: 30
},
yourCars: [{
    type: String,
    // required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
}],
favouriteCar: [{
    type: String,
    // required: true,
    trim: true,
    minLength: 1,
    maxLength: 100,
}],
});

export default mongoose.model<User>("User", userSchema);

export {User};
