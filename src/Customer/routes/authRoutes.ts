// import express, { Request, Response } from "express";
// import { sendOTP, userSignup, userSignin } from "../controllers/authController";
// import {auth, Customer} from "../../middleware/authMiddleware"

// const router = express.Router();

// // For handling GET requests
// router.get("/allAccess", (req: Request, res: Response) => {
//   res.status(200).send("Public Content.");
// });

// router.get("/customerAccess", auth, Customer, (req: Request, res: Response) => {
//   res.status(200).send("Customer Content.");
// });

// router.post("/sendotp", sendOTP);

// router.post("/register", userSignup);

// router.post("/login", userSignin);

// export default router;
