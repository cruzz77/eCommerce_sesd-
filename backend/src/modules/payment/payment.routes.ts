import { Router } from 'express';
import { body } from 'express-validator';
import paymentController from './payment.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.post(
  '/initiate',
  [
    body('orderId').notEmpty().withMessage('Order ID is required'),
    body('method').notEmpty().withMessage('Payment method is required')
  ],
  paymentController.initiatePayment
);

router.get('/:orderId', paymentController.getPaymentByOrder);

export default router;
