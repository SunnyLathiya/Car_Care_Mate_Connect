// import { error } from "console";
// import mongoose, {connect} from "mongoose";

// function connects() {
//     return connect('mongodb://localhost:27017/carcaremateconnect')
//     .then(() => {
//         console.log("db connected")
//     }).catch((error: any) => {
//         console.log(error)
//     })
// }

// export default connects;


import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '../..', 'config.env');

dotenv.config({ path: envPath });

const MONGODB_URI = process.env.DATABASE_URL || '';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {

    } as ConnectOptions);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
