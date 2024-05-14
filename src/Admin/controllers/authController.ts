import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../Auth/models/userModel";

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      mechName,
      email,
      password,
      accountType,
      phoneNumber,
    }: {
      mechName: string;
      email: string;
      password: string;
      accountType: string;
      phoneNumber: string;
    } = req.body;

    const isAdmin = req.user && req.user.accountType === "Admin";
    const userType = isAdmin ? "Mechanic" : accountType;

    if (!mechName || !email || !password || !phoneNumber) {
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
      mechName,
      email,
      password: hashedPassword,
      phoneNumber,
      accountType: userType,
      id,
    });

    console.log("user", user);

    return res.status(200).json({
      success: true,
      message: "user created account successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user can not be registered, please try again",
    });
  }
};
