import { Response } from 'express';
import { ApiResponseShape } from '../types';

/**
 * OOP PRINCIPLE: Encapsulation
 * WHY: Standardizes the structure of all API responses, ensuring consistency
 *      across the application and simplifying client-side consumption.
 */
export class ApiResponse {
  static success<T>(res: Response, message: string, data?: T, statusCode = 200): Response {
    const body: ApiResponseShape<T> = { success: true, message, data };
    return res.status(statusCode).json(body);
  }

  static created<T>(res: Response, message: string, data?: T): Response {
    return ApiResponse.success(res, message, data, 201);
  }
}
