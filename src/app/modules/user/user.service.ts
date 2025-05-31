import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TLoginUser, TUser } from './user.interface';
import { User } from './user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (userData: TUser) => {
  console.log(userData);
  const existingUser = await User.isUserExists(userData.email);

  if (existingUser) {
    throw new AppError(StatusCodes.CONFLICT, 'Email is already in use');
  }

  await User.create(userData);
  const result = await User.findOne({ email: userData.email }).select(
    '_id name email role',
  );

  // Send back the user data along with a success message and token
  const jwtPayload = {
    email: result?.email,
    role: result?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  // const refreshToken = jwt.sign(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   {
  //     expiresIn: '30d',
  //   },
  // );

  return {
    message: 'User registered successfully',
    user: result,
    token: accessToken,
  };
};
const loginUser = async (userData: TLoginUser) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isBlock = existingUser?.isBlocked;

  if (isBlock) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  const isPasswordValid = await bcrypt.compare(
    userData.password,
    existingUser.password,
  );
  if (!isPasswordValid) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
  }

  const jwtPayload = {
    email: existingUser.email,
    role: existingUser.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '100d',
  });
  return {
    token: accessToken,
  };
};
const getUserFromDb = async () => {
  const user = await User.find();
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};
const getSingleUserFromDb = async (email: string) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};
const getAllUserFromDb = async () => {
  const user = await User.find();
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // Checking if the user exists
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked!');
  }

  const isMatch = await bcrypt.compare(payload.oldPassword, user.password);
  if (!isMatch) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Incorrect old password!');
  }

  // const newHashedPassword = await bcrypt.hash(
  //   payload.newPassword,
  //   Number(config.bcrypt_salt),
  // );

  user.password = payload.newPassword;

  await user.save();

  return { message: 'Password updated successfully' };
};
const updateUser = async (email: string, userData: TUser) => {
  const { name, address } = userData;

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { name, address },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  return updatedUser;
};
export const UserServices = {
  createUserIntoDB,
  loginUser,
  getUserFromDb,
  changePassword,
  getSingleUserFromDb,
  getAllUserFromDb,
  updateUser,
};
