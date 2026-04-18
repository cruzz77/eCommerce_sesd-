import { Router } from 'express';
import userController from './user.controller';
import { authMiddleware } from '../../middleware/authMiddleware';
import { roleMiddleware } from '../../middleware/roleMiddleware';
import { UserRole } from '../../types';

const router = Router();

// All user routes are admin only
router.use(authMiddleware);
router.use(roleMiddleware(UserRole.ADMIN));

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);

export default router;
