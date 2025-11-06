import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    // ✅ Extract token properly (supports Bearer + raw token)
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : authHeader;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }

    const { role } = decoded;
    // ✅ Role validation
    if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Forbidden Access');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
