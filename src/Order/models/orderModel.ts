import { Schema, Document, model } from "mongoose";

export interface Order extends Document {
  orderId: string;
  customerId: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
  mechanicId: string;
  mechanicName: string;
  requestedOn: Date;
  deliveredOn?: Date;
  status: string;
  value: string;
}

const orderSchema: Schema = new Schema({
  orderId: { type: String },
  customerId: { type: String },
  customerName: { type: String },
  carName: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, maxlength: 40 },
  serviceName: { type: String },
  servicePrice: { type: Number, required: true, min: 0 },
  mechanicId: { type: String },
  mechanicName: { type: String },
  requestedOn: { type: Date, default: Date.now, required: true },
  deliveredOn: { type: Date },
  status: { type: String, default:"PLACED" },
  value: {type:String}
});

export default model<Order>("Order", orderSchema);
