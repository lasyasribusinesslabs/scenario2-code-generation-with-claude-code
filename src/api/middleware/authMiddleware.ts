import { Request, Response, NextFunction } from 'express';
import { AppError } from '@api/errors';

export interface AuthenticatedRequest extends Request {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new AppError('Missing or invalid Authorization header', 401));
  }

  const token = authHeader.slice(7);
  // TODO: verify JWT and extract userId
  if (!token) {
    return next(new AppError('Unauthorized', 401));
  }

  (req as AuthenticatedRequest).userId = 'stub-user-id';
  next();
}
