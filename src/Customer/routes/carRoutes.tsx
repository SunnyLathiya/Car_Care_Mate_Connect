import express, { Router } from "express";

import {
  findAllBrands,
  findByBrand,
  findByCarId
} from "../controllers/carController";
const router: Router = express.Router();

// import { auth, Admin } from "../../middleware/authMiddleware";

router.get("/findallbrands", findAllBrands);

router.post("/findbybrand", findByBrand);

router.get("/findbycarid/:carId", findByCarId);

export default router;
