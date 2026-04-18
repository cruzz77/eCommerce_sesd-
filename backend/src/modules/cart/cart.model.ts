import mongoose, { Schema, Document } from 'mongoose';

/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Cart items and total calculation are encapsulated within the model, 
 *      ensuring that the cart state is always consistent.
 */
export interface ICartItem { 
  productId: mongoose.Types.ObjectId; 
  quantity: number; 
  priceSnapshot: number; 
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId; 
  items: ICartItem[]; 
  updatedAt: Date;
  getTotalAmount(): number;
}

const cartItemSchema = new Schema<ICartItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceSnapshot: { type: Number, required: true },
}, { _id: false });

const cartSchema = new Schema<ICart>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
}, { timestamps: true });

cartSchema.methods.getTotalAmount = function (): number {
  return this.items.reduce((sum: number, item: ICartItem) => sum + item.priceSnapshot * item.quantity, 0);
};

export const Cart = mongoose.model<ICart>('Cart', cartSchema);
