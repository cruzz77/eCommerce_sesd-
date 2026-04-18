/**
 * DESIGN PATTERN: Middleware
 * WHY: Centrally authenticates requests using JWT, ensuring that protected 
 *      routes receive a valid userId and role.
 */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { JwtPayload } from '../types';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'No token provided'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_min_32_chars') as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};
