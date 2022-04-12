import { Schema, model } from 'mongoose';
import { createHash } from 'crypto';

interface User {
  username: string;
  password: string;
  staffName: string;
  role: string;
  status: number;
  createAt?: Date;
  updateAt?: Date;
}

const schema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  staffName: { type: String },

  role: { type: String },

  status: { type: Number, default: 0 },

  createAt: {
    type: Date,
    default: Date.now()
  },

  updateAt: {
    type: Date,
    default: Date.now()
  }
})

export const UserModel = model<User>('User', schema);

export function setPassword(password: string) {
  password = createHash('sha256').update(password).digest('hex');
  return password;
}
