/**
 * DESIGN PATTERN: Strategy (Concrete Implementation — UPI)
 * OOP PRINCIPLE: Polymorphism
 * WHY: Isolates UPI specific processing logic from other methods.
 */
import { PaymentStrategy, PaymentResult } from './PaymentStrategy';
import { IOrder } from '../../order/order.model';
import { PaymentStatus } from '../../../types';

export class UPIStrategy extends PaymentStrategy {
  readonly methodName = 'upi';

  async processPayment(order: IOrder, amount: number): Promise<PaymentResult> {
    await this.simulateProcessingDelay(200);
    const isSuccess = Math.random() > 0.03;
    return {
      status: isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
      transactionId: this.generateTransactionId(),
      message: isSuccess
        ? `UPI payment of ₹${amount} processed successfully`
        : 'UPI transaction timed out. Please retry.',
    };
  }
}
