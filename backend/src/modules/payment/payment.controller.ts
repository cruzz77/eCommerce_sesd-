/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Standardizes payment interaction.
 */
import { Request, Response } from 'express';
import paymentService from './payment.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class PaymentController {
  initiatePayment = asyncHandler(async (req: Request, res: Response) => {
    const data = await paymentService.initiatePayment(req.user!.userId, req.body);
    return ApiResponse.success(res, 'Payment processed', data);
  });

  getPaymentByOrder = asyncHandler(async (req: Request, res: Response) => {
    const payment = await paymentService.getPaymentByOrder(req.params.orderId as string);
    return ApiResponse.success(res, 'Payment status retrieved', payment);
  });
}

export default new PaymentController();
