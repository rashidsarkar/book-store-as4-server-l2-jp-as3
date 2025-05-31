import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import { TBook } from './book.interface';
import { Book } from './book.model';
import AppError from '../../errors/AppError';

const createBookIntoDb = async (payload: TBook) => {
  const bookData = {
    ...payload,
    price: Number(payload.price),
  };
  //   console.log(payload.price);
  const blog = await Book.create(bookData);

  return blog;
};
const getAllBookFromDb = async (query: Record<string, unknown>) => {
  //   console.log(payload.price);
  const searchAbleFields = ['name', 'author', 'category'];
  const bookAfterFilter = new QueryBuilder(Book.find(), query)
    .search(searchAbleFields)
    .filter()
    .sort();

  const result = await bookAfterFilter.modelQuery.select(
    '_id name content author quantity image price category description publicationYear',
  );
  // console.log('result', result);

  return result;
};
const updateBookIntoDb = async (id: string, updateData: Partial<TBook>) => {
  const blog = await Book.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Book not found');
  }

  const updatedBlog = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedBlog;
};
const getSingleBookbyId = async (id: string) => {
  //   console.log(payload.price);
  const blog = await Book.findById(id);

  return blog;
};
const deletedBookbyId = async (id: string) => {
  //   console.log(payload.price);
  const blog = await Book.findByIdAndDelete(id);

  return blog;
};

export const BookService = {
  createBookIntoDb,
  getAllBookFromDb,
  updateBookIntoDb,
  getSingleBookbyId,
  deletedBookbyId,
};
