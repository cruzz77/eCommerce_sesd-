/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Manages order-specific requests for both users and administrators.
 */
import { Request, Response } from 'express';
import orderService from './order.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class OrderController {
  checkout = asyncHandler(async (req: Request, res: Response) => {
    const order = await orderService.checkout(req.user!.userId, req.body);
    return ApiResponse.created(res, 'Order placed successfully', order);
  });

  getMyOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await orderService.getMyOrders(req.user!.userId);
    return ApiResponse.success(res, 'Orders retrieved successfully', orders);
  });

  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const order = await orderService.getOrderById(req.params.id as string);
    return ApiResponse.success(res, 'Order retrieved successfully', order);
  });

  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await orderService.getAllOrders();
    return ApiResponse.success(res, 'All orders retrieved', orders);
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const order = await orderService.updateStatus(req.params.id as string, req.body.status);
    return ApiResponse.success(res, 'Order status updated', order);
  });
}

export default new OrderController();
