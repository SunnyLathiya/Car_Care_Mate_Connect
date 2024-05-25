"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMyOrders = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel")); // Adjust the path if necessary
// Find My Orders
const findMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel_1.default.find({ customerId: req.params.customerId }).exec();
        if (orders.length === 0) {
            res.status(200).json({
                message: 'No Orders',
            });
        }
        else {
            res.status(200).json({
                orders: orders,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
});
exports.findMyOrders = findMyOrders;
