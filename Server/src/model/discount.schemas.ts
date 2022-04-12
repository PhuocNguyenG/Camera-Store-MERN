import { Schema, model } from 'mongoose';


interface Discount {
  discountName: string;
  discountDesc: string;
  discountAmount: number;
  discountStatus: number;
}

const schema = new Schema<Discount>({
  discountName: { type: String, required: true },

  discountDesc: { type: String, required: true },

  discountAmount: { type: Number, required: true },

  discountStatus: { type: Number, required: true },

})

const DisCountModel = model<Discount>('Discount', schema);

export default DisCountModel;