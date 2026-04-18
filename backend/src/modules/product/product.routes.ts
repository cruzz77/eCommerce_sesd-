import { Router } from 'express';
import { body } from 'express-validator';
import productController from './product.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { roleMiddleware } from '../../middleware/roleMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', productController.listProducts);
router.get('/:id', productController.getProduct);

// Admin only routes
router.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('stock').isNumeric().withMessage('Stock must be a number'),
    body('categoryId').notEmpty().withMessage('Category ID is required')
  ],
  productController.createProduct
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  productController.updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  productController.deleteProduct
);

router.get(
  '/admin/low-stock',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  productController.getLowStock
);

export default router;
