import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

export interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const auth = (...requiredRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
   
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(401, 'You are not authorized!');
      }

      const jwtToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

      // 2. Token Verify করা
      const decoded = jwt.verify(
  jwtToken,
  process.env.JWT_ACCESS_SECRET as string 
) as JwtPayload;

     
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden! You do not have permission.');
      }


      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;

