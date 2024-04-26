import express from "express";
import {findInProcessOrders, updateOrder, findMyOrders} from "../controllers/orderController";
import {auth, Mechanic} from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/findInprocessorders/:mechId",
//  auth, Mechanic,
  findInProcessOrders);

router.patch("/updateorder/:orderId",
//  auth, Mechanic, 
 updateOrder);

router.get("/findmyorders/:mechId",
//  auth, Mechanic,
  findMyOrders);

export default router;

