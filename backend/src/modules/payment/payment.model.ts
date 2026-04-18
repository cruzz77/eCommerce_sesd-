import mongoose, { Schema, Document } from 'mongoose';
import { PaymentMethod, PaymentStatus } from '../../types';

/**
 * OOP PRINCIPLE: Abstraction
 * WHY: Tracks payment transactions independently from orders, allowing 
 *      for multiple payment attempts or methods per order.
 */
export interface IPayment extends Document {
  orderId: mongoose.Types.ObjectId; 
  userId: mongoose.Types.ObjectId;
  amount: number; 
  method: PaymentMethod; 
  status: PaymentStatus; 
  transactionId: string; 
  createdAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: Object.values(PaymentMethod), required: true },
  status: { type: String, enum: Object.values(PaymentStatus), default: PaymentStatus.PENDING },
  transactionId: { 
    type: String, 
    default: () => `TXN_${Date.now()}_${Math.random().toString(36).substr(2,9).toUpperCase()}` 
  },
}, { timestamps: true });

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);
