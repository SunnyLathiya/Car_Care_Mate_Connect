
import express, {Request, Response} from "express";
import cors from "cors";
import authRoutes from "./Auth/routes/userRoutes";
import profileRoutes from "./Auth/routes/profileRoutes";
import contactRoutes from "./Auth/routes/contactRoutes"

import CustomerOrderRoutes from "./Customer/routes/orderRoutes";
import customerCar from "./Customer/routes/carRoutes";

import authAdminRoutes from "./Admin/routes/authAdminRoutes";
import carRoutes from "./Admin/routes/carRoutes";
import serverRoutes from "./Admin/routes/serviceRoutes";
import mechCreateRouters from "./Admin/routes/mechanicRoutes";
import orderAdminRoutes from "./Admin/routes/orderRoutes";

import mechOrderRoutes from "./Mechanic/routes/orderRoutes";

import connects from "./config/db";

import dotenv from 'dotenv';
import path from 'path';

const envPath = path.join(__dirname, '..', 'config.env');

dotenv.config({ path: envPath });


// import fileupload from 'express-fileupload';
import { cloudinaryConnect } from "./config/cloudinary"

const app = express();
app.use(express.json());
cloudinaryConnect();
// app.use(
//     fileupload({
//       useTempFiles: true,
//       tempFileDir: "/temp"
//     })
//   );

const PORT = process.env.PORT || 5000;
app.use(cors());

app.use('/api/v1', authRoutes, profileRoutes, contactRoutes);
app.use('/api/v1/customer',  CustomerOrderRoutes, profileRoutes, customerCar)
app.use('/api/v1/admin', mechCreateRouters, authAdminRoutes, carRoutes, serverRoutes, orderAdminRoutes);
app.use('/api/v1/mechanic', mechOrderRoutes);


connects();

app.listen(PORT, ():void => {
    console.log(`SERVER RUNNING ON PORT NUMBER ${PORT}`)
});
