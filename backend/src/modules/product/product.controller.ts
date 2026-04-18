/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Standardizes product-related request handling and response mapping.
 */
import { Request, Response } from 'express';
import productService from './product.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class ProductController {
  listProducts = asyncHandler(async (req: Request, res: Response) => {
    const data = await productService.listProducts(req.query as any);
    return ApiResponse.success(res, 'Products retrieved successfully', data);
  });

  getProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.getProduct(req.params.id as string);
    return ApiResponse.success(res, 'Product retrieved successfully', product);
  });

  createProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.createProduct(req.body);
    return ApiResponse.created(res, 'Product created successfully', product);
  });

  updateProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await productService.updateProduct(req.params.id as string, req.body);
    return ApiResponse.success(res, 'Product updated successfully', product);
  });

  deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id as string);
    return ApiResponse.success(res, 'Product deleted successfully');
  });

  getLowStock = asyncHandler(async (req: Request, res: Response) => {
    const products = await productService.getLowStockProducts();
    return ApiResponse.success(res, 'Low stock products retrieved', products);
  });
}

export default new ProductController();
