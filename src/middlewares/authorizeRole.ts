import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'No está autorizado para realizar esta acción' });
    }
  };
};