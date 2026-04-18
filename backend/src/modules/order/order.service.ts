/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Orchestrates the checkout process, ensuring atomicity across 
 *      cart, product stock, and order creation.
 */
import orderRepository from './order.repository';
import cartRepository from '../cart/cart.repository';
import productRepository from '../product/product.repository';
import { CheckoutDTO, OrderStatus } from '../../types';
import { ApiError } from '../../utils/ApiError';
import { IOrderItem } from './order.model';

export class OrderService {
  async checkout(userId: string, dto: CheckoutDTO) {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    // Prepare order items and update stock
    const orderItems: IOrderItem[] = [];
    for (const item of cart.items) {
      const pId = (item.productId as any)._id ? (item.productId as any)._id.toString() : item.productId.toString();
      const product = await productRepository.findById(pId);
      if (!product) throw new ApiError(404, `Product ${item.productId} not found`);
      if (product.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for ${product.name}`);
      }
      
      orderItems.push({
        productId: product._id as any,
        name: product.name,
        qty: item.quantity,
        price: item.priceSnapshot
      });

      // Update stock
      await productRepository.decrementStock(product._id.toString(), item.quantity);
    }

    const totalAmount = cart.getTotalAmount();

    const order = await orderRepository.create({
      userId,
      items: orderItems,
      totalAmount,
      shippingAddress: dto.shippingAddress,
      status: OrderStatus.PENDING
    });

    // Clear cart after order creation
    await cartRepository.clearCart(userId);

    return order;
  }

  async getMyOrders(userId: string) {
    return orderRepository.findByUserId(userId);
  }

  async getOrderById(id: string) {
    const order = await orderRepository.findById(id);
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  }

  async getAllOrders() {
    return orderRepository.findAll();
  }

  async updateStatus(id: string, status: OrderStatus) {
    const order = await orderRepository.updateStatus(id, status);
    if (!order) throw new ApiError(404, 'Order not found');
    return order;
  }
}

export default new OrderService();
