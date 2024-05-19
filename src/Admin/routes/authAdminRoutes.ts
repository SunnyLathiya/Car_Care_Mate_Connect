import express, { Request, Response } from "express";
import {signup } from "../controllers/authController";
import {auth, Admin} from "../../middleware/authMiddleware"

const router = express.Router();

router.post("/register", auth, Admin,  signup);

export default router;
