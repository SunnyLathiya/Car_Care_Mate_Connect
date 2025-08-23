import mongoose, { Schema, Document } from "mongoose";

export interface Service extends Document {
  serviceType: string;
  name: string;
  price: number;
  description: string;
  timeRequired: string;
  where: string;
}

const serviceSchema: Schema = new Schema({
  serviceType: {
    type: String,
    maxlength: 50,
  },
  name: {
    type: String,
    unique: true,
  },
  price: {
    type: Number,
    max: 50000,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  timeRequired: {
    type: String,
  },
  where: {
    type: String,
    maxlength: 50,
  },
  orderCreate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
});

export default mongoose.model<Service>("Service", serviceSchema);