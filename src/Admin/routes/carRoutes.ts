import express, {Request, Response, Router } from "express"

import { addCar, findAllCars, findAllBrands, findByBrand, findByCarId, updateCar, deleteCar } from "../controllers/carController";
const router: Router = express.Router();

import { auth, Admin } from "../../middleware/authMiddleware";

router.post("/addcar", auth, Admin, addCar);

router.get("/findallcars", findAllCars);

router.get("/findallbrands", findAllBrands);

router.post("/findbybrand", findByBrand);

router.get("/findbycarid/:carId", findByCarId);

// router.patch("/updatecar/:id", auth, Admin, updateCar);
router.patch("/updatecar/:id", auth, Admin, updateCar);

// router.delete("/deletecar/:carId", auth, Admin, deleteCar);
router.delete("/deletecar/:carId", auth, Admin, deleteCar);



export default router;
