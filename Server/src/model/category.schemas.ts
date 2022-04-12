import { Schema, model } from 'mongoose';


interface Category {
  typeName: string;
  picture?: string;
  slug?: string;
  createAt?: Date;
  updateAt?: Date;
  productId: Schema.Types.ObjectId;
}

const schema = new Schema<Category>({
  typeName: { type: String, required: true },

  picture: { type: String },

  slug: { type: String },

  createAt: {
    type: Date,
    default: Date.now()
  },

  updateAt: {
    type: Date,
    default: Date.now()
  },

  productId: { type: Schema.Types.ObjectId, ref: 'Product' }
})

const CategoryModel = model<Category>('Category', schema);

export default CategoryModel;