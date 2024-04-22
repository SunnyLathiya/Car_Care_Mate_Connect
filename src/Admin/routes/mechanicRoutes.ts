import express, {Request, Response, Router } from "express"

const router: Router = express.Router();

import { findAvailable, findAll, deleteMechanic, updateMechanic } from "../controllers/mechanicsController"
import { auth, Admin } from "../../middleware/authMiddleware"

router.get("/findavailable", auth, Admin, findAvailable);

router.get("/findall", auth, Admin, findAll);

router.delete("/deletemechanic/:mechId", auth, Admin, deleteMechanic);


router.patch("/updatemechanic/:mechId", auth, Admin, updateMechanic);


export default router;