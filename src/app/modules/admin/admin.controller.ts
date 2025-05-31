/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';
import { StatusCodes } from 'http-status-codes';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const requester = req.tokenUser;

  const { userId } = req.params;
  const { runningStatus } = req.body;
  // console.log(runningStatus);
  const result = await AdminServices.blockUSerFromDb(
    userId,
    requester,
    runningStatus,
  );

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'User blocked successfully',
    statusCode: StatusCodes.OK,
  });
});

const deleteBlogByAdmin = catchAsync(async (req: Request, res: Response) => {
  const requester = req.tokenUser;
  const { id } = req.params;
  const result = await AdminServices.deleteBlogFromDbByAdmin(id, requester);

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Blog deleted successfully',
    statusCode: StatusCodes.OK,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlogByAdmin,
};
