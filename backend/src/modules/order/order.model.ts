import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus } from '../../types';

/**
 * OOP PRINCIPLE: Abstraction
 * WHY: Represents a finalized purchase, decoupling historical order data 
 *      from dynamic product and cart states.
 */
export interface IOrderItem { 
  productId: mongoose.Types.ObjectId; 
  name: string; 
  qty: number; 
  price: number; 
}

export interface IShippingAddress { 
  name: string; 
  address: string; 
  city: string; 
  pin: string; 
}

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId; 
  items: IOrderItem[];
  totalAmount: number; 
  status: OrderStatus; 
  shippingAddress: IShippingAddress; 
  createdAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: String, 
  qty: Number, 
  price: Number,
}, { _id: false });

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
  shippingAddress: { 
    name: String, 
    address: String, 
    city: String, 
    pin: String 
  },
}, { timestamps: true });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
