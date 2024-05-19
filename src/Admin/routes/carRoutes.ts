import express, { Router } from "express";

import {
  addCar,
  findAllCars,
  updateCar,
  deleteCar,
} from "../controllers/carController";
const router: Router = express.Router();

import { auth, Admin } from "../../middleware/authMiddleware";

router.post("/addcar", auth, Admin, addCar);

router.get("/findallcars", auth, Admin, findAllCars);

router.patch("/updatecar/:id", auth, Admin, updateCar);

router.delete("/deletecar/:carId", auth, Admin, deleteCar);

export default router;
