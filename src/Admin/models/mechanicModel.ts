import mongoose, { Schema, Document } from 'mongoose';

export interface Mechanic extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile?: string;
  accountType?: string;
  status: string;
  token: string;
}

const mechanicSchema: Schema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  // confirmpassword: { type: String, required: true },
  mobile: { type: String },
  accountType: {
    type: String,
    default: 'MECHANIC',
  },
  status: { type: String, default: 'AVAILABLE' },
  token: {
    type: String,
  }
});

export default mongoose.model<Mechanic>('Mechanic', mechanicSchema);
