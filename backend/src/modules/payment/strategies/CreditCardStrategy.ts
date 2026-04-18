/**
 * DESIGN PATTERN: Strategy (Concrete Implementation — Credit Card)
 * OOP PRINCIPLE: Polymorphism — overrides processPayment from abstract base.
 * WHY: Isolates credit card specific processing logic (simulation) from other methods.
 */
import { PaymentStrategy, PaymentResult } from './PaymentStrategy';
import { IOrder } from '../../order/order.model';
import { PaymentStatus } from '../../../types';

export class CreditCardStrategy extends PaymentStrategy {
  readonly methodName = 'credit_card';

  async processPayment(order: IOrder, amount: number): Promise<PaymentResult> {
    await this.simulateProcessingDelay(300);
    // Simulate 95% success rate for credit card
    const isSuccess = Math.random() > 0.05;
    return {
      status: isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
      transactionId: this.generateTransactionId(),
      message: isSuccess
        ? `Credit card payment of ₹${amount} processed successfully`
        : 'Credit card declined. Please try another method.',
    };
  }
}
