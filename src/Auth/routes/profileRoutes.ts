import express from "express";
const router = express.Router();

import { getProfile ,updatedProfile, deleteAccount, updatedPassword} from "../controllers/profileController";
import { auth } from "../../middleware/authMiddleware";

router.get("/profile", auth, getProfile);


router.put("/updatedProfile/:customerId", auth, updatedProfile);
router.delete("/deleteprofile/", auth, deleteAccount);

router.put("/updatedpassword", auth, updatedPassword);


export default router;
