/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Isolates payment transaction records from the payment processing logic.
 */
import { Payment, IPayment } from './payment.model';
import { PaymentStatus } from '../../types';

export class PaymentRepository {
  async create(data: any): Promise<IPayment> {
    const payment = new Payment(data);
    return payment.save();
  }

  async findByOrderId(orderId: string): Promise<IPayment | null> {
    return Payment.findOne({ orderId });
  }

  async updateStatus(id: string, status: PaymentStatus, transactionId?: string): Promise<IPayment | null> {
    const update: any = { status };
    if (transactionId) update.transactionId = transactionId;
    return Payment.findByIdAndUpdate(id, update, { new: true });
  }
}

export default new PaymentRepository();
