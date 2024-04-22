"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
router.get("/findOrders/:customerId", authMiddleware_1.auth, authMiddleware_1.Customer, orderController_1.findMyOrders);
module.exports = router;
