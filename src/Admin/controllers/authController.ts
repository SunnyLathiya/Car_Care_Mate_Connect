import { Request, Response} from 'express';
// import customerModel from '../models/customerModel';
import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
// import mechanicModel from '../models/mechanicModel';
import userModel from '../../Auth/models/userModel';

import dotenv from 'dotenv';
dotenv.config();
// import jwt from "jsonwebtoken";




export const signup = async (req: Request, res: Response) => {
    try {
      const {
        mechName,
        email,
        password,
        accountType,
        number
      }: {
        mechName: string;
        email: string;
        password: string;
        accountType: string;
        number: string;
      } = req.body;


      const isAdmin = req.user && req.user.accountType === 'Admin';

      const userType = isAdmin ? 'Mechanic' : accountType;
  
      if (
        !mechName ||
        !email ||
        !password || 
        !number )
       {
        return res.status(400).json({
          success: false,
          message: "please add all data",
        });
      }


      function generateRandomID(): string {
        return Math.floor(100 + Math.random() * 900).toString();
      }
      async function isIDUnique(id: string): Promise<boolean> {
        const existingUser = await userModel.findOne({ userID: id });
        return !existingUser;
      }


      let id = generateRandomID();
      while (!(await isIDUnique(id))) {
        id = generateRandomID();
      }
  
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "user already exists",
        });
      }
  
      let hashedPassword: string;
      try {
        hashedPassword = await bcrypt.hash(password, 12);
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "error in hashing password",
        });
      }
  
      const user = await userModel.create({
        // _id: new mongoose.Types.ObjectId(),
        mechName,
        email,
        password: hashedPassword,
        number: req.body.number,
        accountType: userType,
        id,
      });
  
      return res.status(200).json({
        success: true,
        message: "user created account successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "user can not be registered, please try again",
      });
    }
  };

  
//   export const signin = async (req: Request, res: Response)=> {
//       try {
//           const { email, password }: { email: string; password: string } = req.body;
          
//           if (!email || !password) {
//               return res.status(400).json({
//                   success: false,
//                   message: "please fill all the details carefully",
//                 });
//             }
            
//             let user = await userModel.findOne({ email }).populate("additionalDetails");
            
//             if (!user) {
//                 return res.status(401).json({
//           success: false,
//           message: "Mechanic not regestered",
//         });
//     }
    
//       const payload = {
//           email: user.email,
//           id: user._id,
//           name: user.name,
//           accountType: user.accountType,
//         };
        
//         const sss = "sunny"
        
//         if (await bcrypt.compare(password, user.password)) {
//             // Password matches
//             let token = jwt.sign(payload, sss, {
//                 expiresIn: "2h",
//         });
        
//         user.token = token;
//         // user.password = undefined;
        
//         user = user.toObject();

//         const { password: _, ...userWithoutPassword } = user;
        
//         const options = {
//             expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//             httpOnly: true,
//         };
        
//         res.cookie("token", token, options).status(200).json({
//             success: true,
//             token,
//             user: userWithoutPassword,
//             message: "login successfully",
//         });
//     } else {
//         res.status(400).json({
//             success: false,
//             message: "password incorrect",
//         });
//     }
// } catch (error) {
//     console.log(error);
//       res.status(500).json({
//         success: false,
//         message: "login failure, please try again",
//     });
// }
//   };
  
  