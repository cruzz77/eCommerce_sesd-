import { Request, Response } from 'express';
import aiService from './ai.service';
import { ApiResponse } from '../../utils/ApiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export class AIController {
  recommend = asyncHandler(async (req: Request, res: Response) => {
    const { query } = req.body;
    if (!query) return ApiResponse.error(res, 'Query is required', 400);

    const matches = await aiService.recommendProducts(query);
    return ApiResponse.success(res, 'AI Recommendations retrieved', matches);
  });
}

export default new AIController();
