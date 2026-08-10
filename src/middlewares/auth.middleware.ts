import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

// req-এর সাথে user ডাটা টাইপ যুক্ত করার জন্য Custom Request Type
export interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

const auth = (...requiredRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      // 1. Header থেকে token নেওয়া
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(401, 'You are not authorized!');
      }

      // 'Bearer <token>' থেকে মূল token আলাদা করা
      const jwtToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

      // 2. Token Verify করা
      const decoded = jwt.verify(
        jwtToken,
        process.env.JWT_SECRET || 'secret'
      ) as JwtPayload;

      // 3. Role-based authorization চেক (যদি নির্দিষ্ট role চাওয়া হয়)
      if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
        throw new ApiError(403, 'Forbidden! You do not have permission.');
      }

      // Request-এ user ডাটা সেট করে দেওয়া
      req.user = decoded;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;