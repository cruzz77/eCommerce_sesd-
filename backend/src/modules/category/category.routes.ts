import { Router } from 'express';
import { body } from 'express-validator';
import categoryController from './category.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { roleMiddleware } from '../../middleware/roleMiddleware';
import { UserRole } from '../../types';

const router = Router();

router.get('/', categoryController.listCategories);

router.post(
  '/',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  [
    body('name').notEmpty().withMessage('Name is required')
  ],
  categoryController.createCategory
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(UserRole.ADMIN),
  categoryController.deleteCategory
);

export default router;
