import { Router } from 'express';
import { body } from 'express-validator';
import orderController from './order.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { roleMiddleware } from '../../middleware/roleMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.use(authMiddleware);

router.post(
  '/checkout',
  [
    body('shippingAddress.name').notEmpty().withMessage('Name is required'),
    body('shippingAddress.address').notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.pin').notEmpty().withMessage('Pin is required')
  ],
  orderController.checkout
);

router.get('/', orderController.getMyOrders);
router.get('/:id', orderController.getOrderById);

// Admin routes
router.get('/admin/all', roleMiddleware(UserRole.ADMIN), orderController.getAllOrders);
router.patch('/:id/status', roleMiddleware(UserRole.ADMIN), orderController.updateStatus);

export default router;
