import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookService } from './book.service';
import { Request, Response } from 'express';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;

  // console.log(bookData);

  const result = await BookService.createBookIntoDb(bookData);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});
const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  // console.log(query);
  const result = await BookService.getAllBookFromDb(query);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { idx } = req.params;
  // console.log(idx);
  // console.log(query);
  const result = await BookService.getSingleBookbyId(idx);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.updateBookIntoDb(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});
const deletedBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.deletedBookbyId(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book Deleted successfully',
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getAllBook,
  updateBook,
  getSingleBook,
  deletedBook,
};
