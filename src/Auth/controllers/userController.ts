import { Request, Response } from 'express';
// import otpModel from '../models/otpModel';
// import otpGenerator from 'otp-generator';
// import otpGenerator from 'otp-generator';
// import * as otpGenerator from 'otp-generator';
import userModel from '../models/userModel';
import bcrypt from 'bcrypt';
import mailSender from '../../utils/mailSender';
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto';

import jwt from "jsonwebtoken";

// export const sendOTP = async (req: Request, res: Response) => {
//     try {
//       const { email }: { email: string } = req.body;
//       // console.log(req.body);
 
//       // console.log(email);
  
//       let checkUserPresent = await userModel.findOne({ email });
  
//       if (checkUserPresent) {
//         return res.status(400).json({
//           success: false,
//           message: "User Already Registered",
//         });
//       }
  
//       let otp: string = otpGenerator.generate(6, {
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false,
//       });
//       // console.log(otp);
  
//       let result = await otpModel.findOne({ otp: otp });
//       // while (result) {
//         otp = otpGenerator.generate(6, {
//           upperCaseAlphabets: false,
//           lowerCaseAlphabets: false,
//           specialChars: false,
//         });
//         result = await otpModel.findOne({ otp: otp });
//       // }
  
//       const otpPayload = { email, otp };
  
//       const otpBody = await otpModel.create(otpPayload);
//       // console.log("op:", otpBody);
  
//       res.status(200).json({
//         success: true,
//         message: "OTP send successfully",
//         otp,
//       });
//     } catch (error: any) {
//       console.log(error);
//       return res.status(200).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   };


  export const userSignup = async (req: Request, res: Response) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
        accountType: string;
        contactNumber: string;
      } = req.body;

      // const defaultAccountType = "Customer";

      console.log(req.body)
  
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword
      ) {
        return res.status(400).json({
          success: false,
          message: "please add all data",
        });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password and confirm password are not match",
        });
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

  
      // const profileDetails = await profileModel.create({});

  
      const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        accountType,
        carSelected: null,
        // additionalDetails: profileDetails._id,
        profilePhoto: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
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

  export const userSignin = async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      console.log("1", email);
      console.log("2", password)
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "please fill all the details carefully",
        });
      }
  
      let user = await userModel.findOne({ email })
      // .populate("additionalDetails");
      console.log("1", user)
      // console.log(user.username)
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "user is not registered",
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const sss = "sunny"
  
      if (await bcrypt.compare(password, user.password)) {
        // Password matches
        let token = jwt.sign(payload, sss, {
          expiresIn: "10h",
        });
  
        user.token = token;
        // user.password = undefined;

        user = user.toObject();

      // Create a new object without the password property
      const { password: _, ...userWithoutPassword } = user;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user: userWithoutPassword,
          message: "login successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "password incorrect",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "login failure, please try again",
      });
    }
  };


  const generateResetToken = () => {
    return crypto.randomBytes(16).toString('hex'); 
  };


// Define a POST route to handle sending the old password via email
export const ForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Find user by email in your UserModel
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a password reset token (you'll need to implement this)
    const resetToken = generateResetToken(); // Implement this function to generate a secure token

    // Save the reset token to the user object in the database
    user.resetToken = resetToken;
    await user.save();

    // Construct the password reset URL
    const resetURL = `http://localhost:3000/forgotpassword/changepassword?token=${resetToken}`;

    console.log("253", resetURL);

    // Send the password reset URL via email using the mailSender function
    const mailInfo = await mailSender(email, 'Password Reset Link', `Click the link to reset your password: ${resetURL}`);

    // Respond with success message
    res.status(200).json({ message: 'Password reset link sent successfully', mailInfo });
  } catch (error: any) {
    console.error('Error sending email:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export const changePasswordWithToken = async (req: Request, res: Response) => {

  const  maintoken  = req.params.token;
  console.log("maintoken", maintoken)
  // const origanaltokan = maintoken.split("=")[1];
  // console.log("token ==> ",origanaltokan)
  const { newPassword, confirmNewPassword } = req.body;

  // console.log("origanaltokan", origanaltokan)
  console.log("newPassword", newPassword)
  console.log("confirmNewPassword", confirmNewPassword)

  try {
    // Validate input fields
    if (!maintoken || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: 'Token and new passwords are required' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    console.log("294", maintoken)
    // Find user by reset token in UserModel
    const user = await userModel.findOne({ resetToken: maintoken });

    console.log("user", user)

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    // Update user's password and clear resetToken

    const hashedPassword = await bcrypt.hash(newPassword, 12);


    user.password = hashedPassword;
    user.resetToken = undefined; // Clear the reset token

    // Save updated user data
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error updating password:', error.message);
    res.status(500).json({ error: 'Failed to update password' });
  }
};




export const allusers = (req: Request, res: Response): void => {
  userModel.find({})
  .exec()
  .then((response: string | any[]) => {
    if (response.length === 0) {
      res.status(200).json({
        message: "not any users!!!",
      });
    } else {
      res.status(200).json({
        message: "all users",
        response,
      });
    }
  })
  .catch((err: any) => {
    console.error("Find All Placed Orders Error: ", err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  })
}










  

  