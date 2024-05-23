import mongoose, { Schema, Document } from "mongoose";

export interface Car extends Document {
  name: string;
  brand: string;
}

const carSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  carselect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
});

export default mongoose.model<Car>("Car", carSchema);
