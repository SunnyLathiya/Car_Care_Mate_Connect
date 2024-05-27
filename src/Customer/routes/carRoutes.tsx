import express, { Router } from "express";

import {
  findAllBrands,
  findByBrand,
  findByCarId
} from "../controllers/carController";
const router: Router = express.Router();

import { auth, Customer} from '../../middleware/authMiddleware'

router.get("/findallbrands", auth, Customer, findAllBrands);

router.post("/findbybrand", auth, Customer, findByBrand);

router.get("/findbycarid/:carId", auth, Customer, findByCarId);

export default router;
