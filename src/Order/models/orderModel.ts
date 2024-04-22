import { Schema, Document, model } from "mongoose";

export interface Order extends Document {
  customerId: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
  mechanicId: string;
  requestedOn: Date;
  deliveredOn?: Date;
  status: string;
}

const orderSchema: Schema = new Schema({
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
  carName: { type: String, required: true },
  carNumber: { type: String, required: true },
  custAddress: { type: String, required: true, maxlength: 40 },
  serviceName: { type: String, required: true },
  servicePrice: { type: Number, required: true, min: 0 },
  mechanicId: { type: String },
  requestedOn: { type: Date, default: Date.now, required: true },
  deliveredOn: { type: Date },
  status: { type: String, required: true, default:"PENDING" },
});

export default model<Order>("Order", orderSchema);
