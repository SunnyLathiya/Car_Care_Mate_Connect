import express, { Router } from "express"

const router: Router = express.Router();

import { findPlacedOrders, updateOrder, findCompletedOrders } from "../controllers/orderController";
import { auth, Admin } from "../../middleware/authMiddleware"

router.get("/findplacedorders", auth, Admin, findPlacedOrders);

router.patch("/updateorder/:orderId", auth, Admin, updateOrder);

router.get("/findcompletedorders", auth, Admin, findCompletedOrders);


export default router;