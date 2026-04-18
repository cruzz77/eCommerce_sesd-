/**
 * DESIGN PATTERN: Middleware Factory
 * WHY: Generates a middleware function that restricts access to specific 
 *      user roles, implementing Role-Based Access Control (RBAC).
 */
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { UserRole } from '../types';

export const roleMiddleware = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new ApiError(403, 'Permission denied'));
    }
    next();
  };
};
