/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Contains complex logic for managing cart items, including stock validation 
 *      and price snapshots for order consistency.
 */
import cartRepository from './cart.repository';
import productRepository from '../product/product.repository';
import { AddToCartDTO, UpdateCartDTO } from '../../types';
import { ApiError } from '../../utils/ApiError';
import { ICart } from './cart.model';

export class CartService {
  async getCart(userId: string) {
    let cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await cartRepository.createForUser(userId);
    }
    return cart;
  }

  async addItem(userId: string, dto: AddToCartDTO) {
    const cart = await this.getCart(userId);
    const product = await productRepository.findById(dto.productId);
    
    if (!product) throw new ApiError(404, 'Product not found');
    if (product.stock < dto.quantity) throw new ApiError(400, 'Insufficient stock');

    const itemIndex = cart.items.findIndex(item => {
      const id = (item.productId as any)._id ? (item.productId as any)._id.toString() : item.productId.toString();
      return id === dto.productId;
    });
    
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += dto.quantity;
      cart.items[itemIndex].priceSnapshot = product.getEffectivePrice();
    } else {
      cart.items.push({
        productId: product._id as any,
        quantity: dto.quantity,
        priceSnapshot: product.getEffectivePrice()
      });
    }

    return cartRepository.save(cart);
  }

  async updateItem(userId: string, dto: UpdateCartDTO) {
    const cart = await this.getCart(userId);
    const itemIndex = cart.items.findIndex(item => {
      const id = (item.productId as any)._id ? (item.productId as any)._id.toString() : item.productId.toString();
      return id === dto.productId;
    });
    
    if (itemIndex === -1) throw new ApiError(404, 'Item not in cart');
    
    const product = await productRepository.findById(dto.productId);
    if (!product) throw new ApiError(404, 'Product not found');
    if (product.stock < dto.quantity) throw new ApiError(400, 'Insufficient stock');

    cart.items[itemIndex].quantity = dto.quantity;
    cart.items[itemIndex].priceSnapshot = product.getEffectivePrice();

    return cartRepository.save(cart);
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter(item => {
      const id = (item.productId as any)._id ? (item.productId as any)._id.toString() : item.productId.toString();
      return id !== productId;
    });
    return cartRepository.save(cart);
  }

  async clearCart(userId: string) {
    return cartRepository.clearCart(userId);
  }
}

export default new CartService();
