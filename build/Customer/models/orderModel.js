"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    customerId: { type: String, required: true },
    customerName: { type: String, required: true },
    carName: { type: String, required: true },
    carNumber: { type: String, required: true },
    custAddress: { type: String, required: true, maxlength: 40 },
    serviceName: { type: String, required: true },
    servicePrice: { type: Number, required: true, min: 0 },
    mechanicId: { type: String, required: true },
    requestedOn: { type: Date, default: Date.now, required: true },
    deliveredOn: { type: Date },
    status: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)("Order", orderSchema);
