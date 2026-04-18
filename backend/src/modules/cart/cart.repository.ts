/**
 * OOP PRINCIPLE: Abstraction
 * DESIGN PATTERN: Repository Pattern
 * WHY: Manages cart state in the database, abstracting complex item updates.
 */
import { Cart, ICart } from './cart.model';

export class CartRepository {
  async findByUserId(userId: string): Promise<ICart | null> {
    return Cart.findOne({ userId }).populate('items.productId');
  }

  async createForUser(userId: string): Promise<ICart> {
    const cart = new Cart({ userId, items: [] });
    return cart.save();
  }

  async save(cart: ICart): Promise<ICart> {
    const saved = await cart.save();
    return saved.populate('items.productId');
  }

  async clearCart(userId: string): Promise<void> {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
  }
}

export default new CartRepository();
