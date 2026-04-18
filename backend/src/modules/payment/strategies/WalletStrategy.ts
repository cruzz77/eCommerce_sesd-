/**
 * DESIGN PATTERN: Strategy (Concrete Implementation — Wallet)
 * OOP PRINCIPLE: Polymorphism
 * WHY: Isolates wallet specific processing logic from other methods.
 */
import { PaymentStrategy, PaymentResult } from './PaymentStrategy';
import { IOrder } from '../../order/order.model';
import { PaymentStatus } from '../../../types';

export class WalletStrategy extends PaymentStrategy {
  readonly methodName = 'wallet';

  async processPayment(order: IOrder, amount: number): Promise<PaymentResult> {
    await this.simulateProcessingDelay(100);
    const isSuccess = Math.random() > 0.01;
    return {
      status: isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
      transactionId: this.generateTransactionId(),
      message: isSuccess
        ? `Wallet debit of ₹${amount} successful`
        : 'Insufficient wallet balance.',
    };
  }
}
