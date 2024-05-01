import express from "express";
const router = express.Router();

// import { findMyOrders } from "../controllers/orderController";
import { getProfile ,updatedProfile, deleteAccount} from "../controllers/profileController";
import { auth } from "../../middleware/authMiddleware";

router.get("/profile", auth, getProfile);


router.put("/updatedProfile/:customerId", auth, updatedProfile);
router.delete("/deleteProfile/:customerId", auth, deleteAccount);


export default router;
