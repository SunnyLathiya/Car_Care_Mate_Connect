import express, { Router } from "express"
import { addService, findAll, updateService, deleteService, findByServiceId  } from "../controllers/serviceController";
import { auth, Admin } from "../../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/addservice", auth, Admin, addService);

router.get("/findallservices", findAll);

router.patch("/updateservice/:serviceId", auth, Admin, updateService);

router.delete("/deleteservice/:serviceId", auth, Admin, deleteService);

router.get("/findbyserviceid/:serviceId", findByServiceId);

export default router;
