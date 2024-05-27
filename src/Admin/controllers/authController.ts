import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../Auth/models/userModel";
import mailSender from "../../utils/mailSender";

export const signup = async (req: Request, res: Response) => {
  try {
    const { mechName, email, password, accountType, phoneNumber } = req.body;

    if (!mechName || !email || !password || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Please add all required data",
      });
    }

    const isAdmin = req.user && req.user.accountType === "Admin";
    const userType = isAdmin ? "Mechanic" : accountType;

    function generateRandomID(): string {
      return `Mec${Math.floor(100 + Math.random() * 900).toString()}`;
    }

    async function isIDUnique(id: string): Promise<boolean> {
      const existingUser = await userModel.findOne({ id: id });
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
        message: "User already exists",
      });
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "Error in hashing password",
      });
    }

    const user = await userModel.create({
      mechName,
      email,
      password: hashedPassword,
      phoneNumber,
      accountType: userType,
      id,
    });

    const title = "Welcome to Our CarCareMateConnect";
    const body = `Hello ${mechName},\n\nYour account has been created successfully. You can receive your password with forget option with your email.`;

    try {
      await mailSender(
        email,
        title,
        body,
      );
    } catch (error: any) {
      message: error.message || "Error sending email"
    }

    return res.status(200).json({
      success: true,
      message: "User created account successfully",
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "User cannot be registered, please try again",
    });
  }
};