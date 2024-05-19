import express, { Router } from "express"
const router: Router = express.Router();

import { findAvailable, findAll } from "../controllers/mechanicsController"
import { auth, Admin } from "../../middleware/authMiddleware"

router.get("/findavailable", auth, Admin, findAvailable);

router.get("/findall", auth, Admin, findAll);

export default router;