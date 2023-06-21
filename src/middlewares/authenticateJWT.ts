import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload: Payload) => {
      if (err) {
        return res.status(401).json({ message: 'No se pudo autenticar el token' });
      }

      req.user = { userId: payload.userId, role: payload.role };
      next();
    });
  } else {
    res.status(401).json({ message: 'No se proporcionó el token de autenticación' });
  }
};