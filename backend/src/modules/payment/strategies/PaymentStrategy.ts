/**
 * DESIGN PATTERN: Strategy (Abstract Base)
 * OOP PRINCIPLE: Abstraction + Polymorphism
 * WHY: Defines the interface that all payment methods must implement.
 *      Each concrete strategy overrides processPayment() with its own logic.
 *      The service layer calls processPayment() without knowing the concrete type.
 */
import { IOrder } from '../../order/order.model';
import { PaymentStatus } from '../../../types';

export interface PaymentResult {
  status: PaymentStatus;
  transactionId: string;
  message: string;
}

export abstract class PaymentStrategy {
  abstract readonly methodName: string;

  abstract processPayment(order: IOrder, amount: number): Promise<PaymentResult>;

  protected generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  protected simulateProcessingDelay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
