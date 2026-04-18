/**
 * OOP PRINCIPLE: Inheritance
 * WHY: Extends the built-in Error class to include HTTP status codes and operational 
 *      flag, allowing for structured error handling in middleware.
 */
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
