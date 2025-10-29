import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../modules/user/user.interface';
import dotenv from 'dotenv';

dotenv.config();

export function generateTokenCookie(user: IUser) {
  const payload: JwtPayload = {
    id: user._id.toString(),
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || 'secretkey';

  const token = jwt.sign(payload, secret, { expiresIn: '4d' });

  // Cookie options
  const cookieOptions = {
    httpOnly: true, // Cannot be accessed via JS
    secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
    sameSite: 'strict' as const, // CSRF protection
  };

  return { token, cookieOptions };
}
