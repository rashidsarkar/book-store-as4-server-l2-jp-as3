import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { USER_ROLE } from '../user/user.const';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Blog } from '../blog/blog.model';
import { TUser } from '../user/user.interface';

const blockUSerFromDb = async (
  id: string,
  requester: JwtPayload,
  currentStatus: boolean,
) => {
  //   console.log(requester);
  //   console.log(id);
  const user = await User.findById(id);
  //   console.log(user);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  // if (user.isBlocked) {
  //   throw new AppError(StatusCodes.FORBIDDEN, 'User Already blocked');
  // }
  if (requester.role !== USER_ROLE.admin) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Only admins can block users');
  }

  const blockUser = await User.findByIdAndUpdate(id, {
    isBlocked: !currentStatus,
  });

  return blockUser;
};

const deleteBlogFromDbByAdmin = async (id: string, requester: JwtPayload) => {
  const blog = await Blog.findById(id).populate<{ author: Partial<TUser> }>(
    'author',
    'name email role',
  );
  let deleteBlogFromAdmin;
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (requester.role === USER_ROLE.admin) {
    deleteBlogFromAdmin = await Blog.findByIdAndDelete(id);
    return deleteBlogFromAdmin;
  }
};

export const AdminServices = {
  blockUSerFromDb,
  deleteBlogFromDbByAdmin,
};
