import { Request, Response } from 'express';
import otpModel from '../models/otpModel';
// import otpGenerator from 'otp-generator';
// import otpGenerator from 'otp-generator';
import * as otpGenerator from 'otp-generator';
import userModel from '../models/userModel';

import bcrypt from 'bcrypt';
import profileModel from '../../Customer/models/profileModel';

import dotenv from 'dotenv';
dotenv.config();

import jwt from "jsonwebtoken";
// import mailSender from '../utils/mailSender';

export const sendOTP = async (req: Request, res: Response) => {
    try {
      const { email }: { email: string } = req.body;
      // console.log(req.body);
 
      // console.log(email);
  
      let checkUserPresent = await userModel.findOne({ email });
  
      if (checkUserPresent) {
        return res.status(400).json({
          success: false,
          message: "User Already Registered",
        });
      }
  
      let otp: string = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      // console.log(otp);
  
      let result = await otpModel.findOne({ otp: otp });
      // while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await otpModel.findOne({ otp: otp });
      // }
  
      const otpPayload = { email, otp };
  
      const otpBody = await otpModel.create(otpPayload);
      // console.log("op:", otpBody);
  
      res.status(200).json({
        success: true,
        message: "OTP send successfully",
        otp,
      });
    } catch (error: any) {
      console.log(error);
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  };


  export const userSignup = async (req: Request, res: Response) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        accountType,
        otp,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmpassword: string;
        accountType: string;
        contactNumber: string;
        otp: string;
      } = req.body;

      // const defaultAccountType = "Customer";
  
      if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmpassword ||
        !otp
      ) {
        return res.status(400).json({
          success: false,
          message: "please add all data",
        });
      }
  
      if (password !== confirmpassword) {
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
  
      const recentOtp = await otpModel.find({ email }).sort({ createdAt: -1 }).limit(1);
  
      if (recentOtp.length == 0) {
        return res.status(400).json({
          success: false,
          message: "OTP not found",
        });
      } else if (otp !== recentOtp[0].otp) {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP",
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

  
      const profileDetails = await profileModel.create({
        number: 9484497949,
      });
  
      const user = await userModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        accountType,
        carSelected: null,
        additionalDetails: profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
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
  
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "please fill all the details carefully",
        });
      }
  
      let user = await userModel.findOne({ email }).populate("additionalDetails");
      console.log(user)
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

  

  