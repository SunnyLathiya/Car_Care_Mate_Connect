import express from "express";
import {findInProcessOrders, updateOrder, findMyOrders, notification} from "../controllers/orderController";
import {auth, Mechanic} from "../../middleware/authMiddleware";

const router = express.Router();

router.get("/findInprocessorders/:_id", auth, Mechanic,findInProcessOrders);

router.patch("/updateorder/:orderId", auth, Mechanic, updateOrder);

router.get("/findmyorders/:mechId", auth, Mechanic, findMyOrders);

router.post("/notification", notification)

export default router;

