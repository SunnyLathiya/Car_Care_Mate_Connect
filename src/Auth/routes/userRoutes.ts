import express from "express";
import {
  userSignup,
  userSignin,
  ForgotPassword,
  changePasswordWithToken,
  allUsers,
} from "../controllers/userController";
import { Admin, auth } from "../../middleware/authMiddleware";

const router = express.Router();

router.post("/register", userSignup);

router.post("/login", userSignin);

router.post("/forgotpassword", ForgotPassword);

router.post("/changepasswordwithtoken/:token", changePasswordWithToken);

router.get("/allusers", auth, Admin, allUsers);

export default router;
