/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Controllers only handle request extraction and response formatting, 
 *      leaving all business logic to the service layer.
 */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import authService from './auth.service';
import { User } from '../user/user.model';
import { ApiResponse } from '../../utils/ApiResponse';
import { ApiError } from '../../utils/ApiError';
import { asyncHandler } from '../../utils/asyncHandler';

export class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(e => e.msg).join(', ');
      throw new ApiError(400, msg);
    }
    const data = await authService.register(req.body);
    return ApiResponse.created(res, 'User registered successfully', data);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const msg = errors.array().map(e => e.msg).join(', ');
      throw new ApiError(400, msg);
    }
    const data = await authService.login(req.body);
    return ApiResponse.success(res, 'Login successful', data);
  });

  getMe = asyncHandler(async (req: Request, res: Response) => {
    // req.user is attached by authMiddleware and contains { userId, role }
    const user = await User.findById(req.user.userId);
    if (!user) throw new ApiError(404, 'User not found');
    
    return ApiResponse.success(res, 'User data retrieved', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  });
}

export default new AuthController();
