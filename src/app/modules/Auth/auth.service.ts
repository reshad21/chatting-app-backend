import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  //checking if the user is exists
  const user = await User.isUserExistsByCustomEmail(payload?.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  //checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'password is not matched !');
  }

  const tokenData = {
    userId: user._id, // ✅ Correct key
    role: user.role, // ✅ Must include role for authorization
    email: user.email,
    name: user.name,
  };


  const accessToken = jwt.sign(tokenData, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    user,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
