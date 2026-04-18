/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Decouples HTTP request handling from user-related business logic.
 */
import { Request, Response } from 'express';
import userService from './user.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class UserController {
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    return ApiResponse.success(res, 'Users retrieved successfully', users);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id as string);
    return ApiResponse.success(res, 'User retrieved successfully', user);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteUser(req.params.id as string);
    return ApiResponse.success(res, 'User deleted successfully');
  });
}

export default new UserController();
