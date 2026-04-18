/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Manages category-related web requests.
 */
import { Request, Response } from 'express';
import categoryService from './category.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class CategoryController {
  listCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoryService.listCategories();
    return ApiResponse.success(res, 'Categories retrieved successfully', categories);
  });

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const category = await categoryService.createCategory(name, description);
    return ApiResponse.created(res, 'Category created successfully', category);
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await categoryService.deleteCategory(req.params.id as string);
    return ApiResponse.success(res, 'Category deleted successfully');
  });
}

export default new CategoryController();
