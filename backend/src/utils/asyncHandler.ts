import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncFn = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * DESIGN PATTERN: Higher-Order Function / Middleware Wrapper
 * WHY: Eliminates repetitive try-catch blocks in controllers by capturing 
 *      errors from async operations and passing them to Express next().
 */
export const asyncHandler = (fn: AsyncFn): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
