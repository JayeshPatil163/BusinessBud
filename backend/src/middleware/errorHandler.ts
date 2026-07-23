import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

interface AppError extends Error {
  statusCode?: number;
  field?: string;
}

/**
 * Global error handling middleware — must be last in Express middleware chain
 */
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  // Log full error in development
  if (!env.isProduction) {
    console.error(`[ERROR] ${statusCode} - ${message}`, err.stack);
  } else {
    // In production, only log 5xx errors
    if (statusCode >= 500) {
      console.error(`[ERROR] ${statusCode} - ${message}`);
    }
  }

  res.status(statusCode).json({
    success: false,
    message: statusCode >= 500 && env.isProduction
      ? "Internal server error"
      : message,
    ...(err.field ? { field: err.field } : {}),
  });
};

/**
 * 404 handler — must be placed after all routes
 */
export const notFoundHandler = (
  req: Request,
  res: Response
): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.path} not found`,
  });
};
