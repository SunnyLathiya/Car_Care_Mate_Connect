import express, {Request, Response, Router } from "express"

const router: Router = express.Router();

import { addService, findAll, updateService, deleteService, findByServiceId  } from "../controllers/serviceController";

import { auth, Admin } from "../../middleware/authMiddleware";

router.post("/addservice", auth, Admin, addService);


router.get("/findallservices", findAll);

router.patch("/updateservice/:serviceId", auth, Admin, updateService);

router.delete("/deleteservice/:serviceId", auth, Admin, deleteService);

router.get("/findbyserviceid/:serviceId", 
// auth, Admin, 
findByServiceId);

export default router;
