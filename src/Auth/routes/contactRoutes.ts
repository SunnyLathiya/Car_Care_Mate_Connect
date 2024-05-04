import express from "express";
import sendEmailController from "../controllers/contactController";
const router = express.Router();

router.post("/sendmail", sendEmailController);


export default router;
