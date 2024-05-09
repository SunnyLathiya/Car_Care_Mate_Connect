import express, { Router } from "express"

const router: Router = express.Router();

import { findPlacedOrders, updateOrder, findCompletedOrders, findCompletedOrdersProfit, AvailableMechanics, allOrders } from "../controllers/orderController";
import { auth, Admin, Mechanic } from "../../middleware/authMiddleware"

router.get("/findplacedorders", auth, Admin, findPlacedOrders);

router.patch("/updateorder/:orderId", auth, Admin, updateOrder);

router.get("/findcompletedorders", auth, Admin, findCompletedOrders);

router.get("/findcompletedordersprofit", 
auth, Admin, 
findCompletedOrdersProfit);

router.get("/availablemechanics", auth, Admin, AvailableMechanics);

router.get("/allorders", auth, allOrders);






export default router;