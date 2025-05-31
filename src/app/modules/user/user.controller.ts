import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);
  // console.log(result, 'from user controler');
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await UserServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  // console.log(req.tokenUser);
  console.log(req.body);
  // res.send()
  const { oldPassword, newPassword } = req.body;
  const result = await UserServices.changePassword(req.tokenUser, {
    oldPassword,
    newPassword,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Password updated successfully!',
    data: result,
  });
});

const getUsers = catchAsync(async (req, res) => {
  // console.log('test', req.tokenUser);
  const result = await UserServices.getUserFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User found',
    data: result,
  });
});
const getSingleUsers = catchAsync(async (req: Request, res: Response) => {
  // console.log('test', req.query);
  const result = await UserServices.getSingleUserFromDb(
    req.query.email as string,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User found',
    data: result,
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  // console.log('test', req.query);
  // console.log('get all');
  const result = await UserServices.getAllUserFromDb();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User found',
    data: result,
  });
});
const updatedUsers = catchAsync(async (req, res) => {
  // console.log('test', req.query);
  // console.log('get all');
  const { email } = req.params;
  console.log(email);
  const result = await UserServices.updateUser(email as string, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User found',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  loginUser,
  getUsers,
  changePassword,
  getSingleUsers,
  getAllUsers,
  updatedUsers,
};
