import express from "express";
const router = express.Router();

import { findMyOrders, addOrder } from "../controllers/orderController";
import { auth, Customer } from "../../middleware/authMiddleware";


router.post(
  "/addorder/:customerId",
  // auth, Customer,
  addOrder
);

router.get(
  "/findOrders/:customerId",
  // auth, Customer,
  findMyOrders
);


export default router;
