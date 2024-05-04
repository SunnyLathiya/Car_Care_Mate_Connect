import express, { Request, Response } from "express";
import {  userSignup, userSignin, ForgotPassword, changePasswordWithToken, allusers } from "../controllers/userController";
import {Admin, auth, Customer} from "../../middleware/authMiddleware"

const router = express.Router();

router.get("/allAccess", (req: Request, res: Response) => {
  res.status(200).send("Public Content.");
});

router.get("/customerAccess", auth, Customer, (req: Request, res: Response) => {
  res.status(200).send("Customer Content.");
});

// router.post("/sendotp", sendOTP);

router.post("/register", userSignup);

router.post("/login", userSignin);

router.post("/forgotpassword", ForgotPassword);

router.post("/changepasswordwithtoken/:token", changePasswordWithToken);
// allusers

router.get("/allusers", auth, Admin, allusers);

export default router;
