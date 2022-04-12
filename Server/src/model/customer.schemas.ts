import { Schema, model } from "mongoose";

interface Customer {
  username: string;
  password: string;
  customerName: string;
  phone: string;
  email: string;
  createAt?: Date;
  updateAt?: Date;
}

const schema = new Schema<Customer>({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  customerName: { type: String },

  phone: { type: String, required: true },

  email: { type: String },

  createAt: {
    type: Date,
    default: Date.now(),
  },

  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

export const CustomerModel = model<Customer>("Customer", schema);

