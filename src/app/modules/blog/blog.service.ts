import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TBlog } from './blog.interface';
import { Blog } from './blog.model';
import { TUser } from '../user/user.interface';
import { USER_ROLE } from '../user/user.const';
import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/QueryBuilder';

const createBlogIntoDb = async (payload: TBlog, authorMail: string) => {
  const author = await User.findOne({ email: authorMail });
  if (!author) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Author not found');
  }
  const blog = await Blog.create({
    ...payload,
    author: author._id,
    isPublished: true,
  });

  const blogWithAuthor = await Blog.findById(blog._id)
    .populate('author', 'name email')
    .select('_id title content author');
  return blogWithAuthor;
};

const updateBlogIntoDb = async (
  id: string,
  updateData: Partial<TBlog>,
  requestEmail: string,
) => {
  const blog = await Blog.findById(id).populate<{ author: Partial<TUser> }>(
    'author',
    'name email',
  );
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  if (requestEmail !== blog.author.email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }
  const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  })
    .populate('author', 'name email')
    .select('_id title content author');

  return updatedBlog;
};

const deleteBlogFromDb = async (id: string, requester: JwtPayload) => {
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

  if (requester.email !== blog.author.email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to Delete this blog',
    );
  }
  const deleteBlog = await Blog.findByIdAndDelete(id);

  return deleteBlog;
};
const getAllBlogFromDb = async (query: Record<string, unknown>) => {
  const searchAbleFields = ['title', 'content'];

  const blogAfterFilter = new QueryBuilder(Blog.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort();

  console.log(blogAfterFilter);
  const result = await blogAfterFilter.modelQuery.select(
    '_id name content author quantity image price category description',
  );

  return result;
};

export const BlogServices = {
  createBlogIntoDb,
  updateBlogIntoDb,
  deleteBlogFromDb,
  getAllBlogFromDb,
};
