import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface DecodedToken {
  email: string;
  id: string;
  username: string;
  accountType: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined =
      req.headers.authorization &&
      req.headers.authorization.replace("Bearer", "").trim();
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }
    try {
      let suny = "sunny";
      const decode = jwt.verify(token, suny as string) as DecodedToken;
      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized!!!",
    });
  }
};

export const Customer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as DecodedToken;
    if (user.accountType !== "Customer") {
      return res.status(401).json({
        success: false,
        message: "this is protected route only for Customer only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not verify, try again",
    });
  }
};

export const Admin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as DecodedToken;
    if (user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "this is protected route only for Admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not verify, try again",
    });
  }
};

export const Mechanic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as DecodedToken;
    if (user.accountType !== "Mechanic") {
      return res.status(401).json({
        success: false,
        message: "this is protected route only for Mechanic only",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user role not verify, try again",
    });
  }
};
