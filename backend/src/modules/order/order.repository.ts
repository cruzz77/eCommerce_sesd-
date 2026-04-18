/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Isolates order-related queries and status updates.
 */
import { Order, IOrder } from './order.model';
import { OrderStatus } from '../../types';

export class OrderRepository {
  async create(data: any): Promise<IOrder> {
    const order = new Order(data);
    return order.save();
  }

  async findById(id: string): Promise<IOrder | null> {
    return Order.findById(id).populate('items.productId');
  }

  async findByUserId(userId: string): Promise<IOrder[]> {
    return Order.find({ userId }).sort({ createdAt: -1 });
  }

  async findAll(): Promise<IOrder[]> {
    return Order.find().sort({ createdAt: -1 }).populate('userId', 'name email');
  }

  async updateStatus(id: string, status: OrderStatus): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(id, { status }, { new: true });
  }
}

export default new OrderRepository();
