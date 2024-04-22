
import express, {Request, Response} from "express";
import cors from "cors";
import authRoutes from "./Auth/routes/userRoutes";

import CustomerOrderRoutes from "./Customer/routes/orderRoutes";
import profileRoutes from "./Customer/routes/profileRoutes";

import authAdminRoutes from "./Admin/routes/authAdminRoutes";
import carRoutes from "./Admin/routes/carRoutes";
import serverRoutes from "./Admin/routes/serviceRoutes";
import mechCreateRouters from "./Admin/routes/mechanicRoutes";
import orderAdminRoutes from "./Admin/routes/orderRoutes";

import mechOrderRoutes from "./Mechanic/routes/orderRoutes";

import connects from "./config/db";

import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.MAIL_USER);
console.log(process.env.MAIL_PASS);
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

const PORT = 4000;
app.use(cors());

app.use('/api/v1', authRoutes);
app.use('/api/v1/customer',  CustomerOrderRoutes, profileRoutes)
app.use('/api/v1/admin', mechCreateRouters, authAdminRoutes, carRoutes, serverRoutes, orderAdminRoutes);
app.use('/api/v1/mechanic', mechOrderRoutes);


connects();

app.listen(PORT, ():void => {
    console.log(`SERVER RUNNING ON PORT NUMBER ${PORT}`)
});
