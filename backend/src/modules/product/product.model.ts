import mongoose, { Schema, Document } from 'mongoose';

/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Business logic (price calculation) is encapsulated in the model method, 
 *      keeping the service layer clean and focused on orchestration.
 */
export interface IProduct extends Document {
  name: string; 
  description: string; 
  price: number;
  discountPercent: number; 
  stock: number;
  categoryId: mongoose.Types.ObjectId; 
  images: string[]; 
  createdAt: Date;
  getEffectivePrice(): number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  discountPercent: { type: Number, default: 0, min: 0, max: 100 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  images: [{ type: String }],
}, { timestamps: true });

// ENCAPSULATION: Business logic is encapsulated in the model method
productSchema.methods.getEffectivePrice = function (): number {
  return parseFloat((this.price * (1 - this.discountPercent / 100)).toFixed(2));
};

export const Product = mongoose.model<IProduct>('Product', productSchema);
