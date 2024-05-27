import express from "express";
const router = express.Router();

import { findMyOrders, addOrder ,webhook} from "../controllers/orderController";
import { auth, Customer } from "../../middleware/authMiddleware";


router.post("/addorder/:customerId", addOrder);

router.get("/findOrders/:customerId", auth, Customer, findMyOrders );

router.post('/webhook', express.raw({type: 'application/json'}),webhook )

export default router;
