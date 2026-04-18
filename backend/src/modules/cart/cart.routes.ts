import { Router } from 'express';
import { body } from 'express-validator';
import cartController from './cart.controller';
import { authMiddleware } from '../../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', cartController.getCart);

router.post(
  '/add',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  cartController.addItem
);

router.put(
  '/update',
  [
    body('productId').notEmpty().withMessage('Product ID is required'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1')
  ],
  cartController.updateItem
);

router.delete('/remove/:productId', cartController.removeItem);
router.delete('/clear', cartController.clearCart);

export default router;
