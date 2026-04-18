/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Standardizes cart interaction for authenticated users.
 */
import { Request, Response } from 'express';
import cartService from './cart.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class CartController {
  getCart = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.getCart(req.user!.userId);
    return ApiResponse.success(res, 'Cart retrieved successfully', cart);
  });

  addItem = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.addItem(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Item added to cart', cart);
  });

  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.updateItem(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Cart updated', cart);
  });

  removeItem = asyncHandler(async (req: Request, res: Response) => {
    const cart = await cartService.removeItem(req.user!.userId, req.params.productId as string);
    return ApiResponse.success(res, 'Item removed from cart', cart);
  });

  clearCart = asyncHandler(async (req: Request, res: Response) => {
    await cartService.clearCart(req.user!.userId);
    return ApiResponse.success(res, 'Cart cleared');
  });
}

export default new CartController();
