import { Request, Response } from "express";
import userModel, { User } from "../models/userModel";
import bcrypt from "bcrypt";
import mailSender from "../../utils/mailSender";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
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
        message: "User already exists",
      });
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      accountType,
      carSelected: null,
      profilePhoto: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User created account successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can not be registered, please try again",
    });
  }
};

export const userSignin = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      fcmToken,
    }: { email: string; password: string; fcmToken: string } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    console.log("111", req.body);
    console.log("222", fcmToken);

    let user = await userModel.findOne({ email, isActive: true });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const sss = "sunny";
    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, sss, {
        expiresIn: "10h",
      });

      if (fcmToken) {
        user.fcmToken = fcmToken;
        await user.save();
      }

      user.token = token;
      user = user.toObject();

      const { password: _, ...userWithoutPassword } = user;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: userWithoutPassword,
        message: "Login successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

const generateResetToken = () => {
  return crypto.randomBytes(16).toString("hex");
};

export const ForgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = generateResetToken();

    user.resetToken = resetToken;
    await user.save();

    const resetURL = `http://localhost:3000/forgotpassword/changepassword?token=${resetToken}`;

    const mailInfo = await mailSender(
      email,
      "Password Reset Link",
      `Click the link to reset your password: ${resetURL}`
    );

    res
      .status(200)
      .json({ message: "Password reset link sent successfully", mailInfo });
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export const changePasswordWithToken = async (req: Request, res: Response) => {
  const maintoken = req.params.token;
  const { newPassword, confirmNewPassword } = req.body;

  try {
    if (!maintoken || !newPassword || !confirmNewPassword) {
      return res
        .status(400)
        .json({ error: "Token and new passwords are required" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await userModel.findOne({ resetToken: maintoken });

    if (!user) {
      return res.status(404).json({ error: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    user.resetToken = undefined;

    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error: any) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ error: "Failed to update password" });
  }
};

export const allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await userModel.find({}).exec();

    if (users.length === 0) {
      res.status(200).json({
        message: "No users found.",
      });
    } else {
      res.status(200).json({
        message: "All users retrieved successfully.",
        users,
      });
    }
  } catch (error) {
    console.error("Find All Users Error:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
