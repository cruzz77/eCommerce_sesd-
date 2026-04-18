/**
 * OOP PRINCIPLE: Abstraction + Polymorphism
 * DESIGN PATTERN: Strategy + Factory
 * WHY: Orchestrates the payment process by selecting the appropriate 
 *      strategy via the factory and processing the transaction.
 */
import paymentRepository from './payment.repository';
import orderRepository from '../order/order.repository';
import { PaymentFactory } from './PaymentFactory';
import { InitiatePaymentDTO, PaymentStatus, OrderStatus } from '../../types';
import { ApiError } from '../../utils/ApiError';

export class PaymentService {
  async initiatePayment(userId: string, dto: InitiatePaymentDTO) {
    const order = await orderRepository.findById(dto.orderId);
    
    if (!order) throw new ApiError(404, 'Order not found');
    if (order.userId.toString() !== userId) throw new ApiError(403, 'Unauthorized');
    if (order.status !== OrderStatus.PENDING) {
      throw new ApiError(400, 'Payment already processed or order not pending');
    }

    // Use Factory to get concrete Strategy
    const strategy = PaymentFactory.create(dto.method);

    // Process payment via Strategy (Polymorphism)
    const result = await strategy.processPayment(order as any, order.totalAmount);

    // Record the payment attempt
    const payment = await paymentRepository.create({
      orderId: order._id,
      userId,
      amount: order.totalAmount,
      method: dto.method,
      status: result.status,
      transactionId: result.transactionId
    });

    // Update order status if payment was successful
    if (result.status === PaymentStatus.SUCCESS) {
      await orderRepository.updateStatus(order._id.toString(), OrderStatus.PAID);
    }

    return {
      payment,
      message: result.message
    };
  }

  async getPaymentByOrder(orderId: string) {
    return paymentRepository.findByOrderId(orderId);
  }
}

export default new PaymentService();
