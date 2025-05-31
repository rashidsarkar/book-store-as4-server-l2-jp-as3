import { Order } from './order.model';
import { TOrderData } from './order.interface';
import stripe from './utils';
import { Book } from '../Book/book.model';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';

const createOrderIntoDb = async (payload: TOrderData) => {
  try {
    let sentResponseSecret = {};

    // Handle Stripe payment
    if (payload.paymentMethod === 'stripe') {
      const amount = Math.round(Number(payload.totalPrice) * 100); // Ensure correct format
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
      });

      sentResponseSecret = {
        clientSecret: paymentIntent.client_secret,
      };
      return { ...sentResponseSecret };
    }
    const quantity = payload.quantity;
    const restBook = await Book.findByIdAndUpdate(payload.product, {
      $inc: { quantity: -quantity },
    });
    // console.log(restBook);

    if (!restBook) {
      return { message: 'Product is out of stock' };
    }

    // Save order in DB
    const order = await Order.create(payload);
    await order.populate(['product', 'userId']);

    return order;

    // console.log('order', order);
  } catch (error) {
    console.error('Order creation failed:', error);
    throw new Error('Failed to create order');
  }
};
const createOrderPaymentIntoDb = async (payload: TOrderData) => {
  //   console.log(payload);

  //   console.log(payload.price);
  const quantity = payload.quantity;
  const restBook = await Book.findByIdAndUpdate(payload.product, {
    $inc: { quantity: -quantity },
  });
  if (!restBook) {
    return { message: 'Product is out of stock' };
  }
  // console.log(restBook);
  const order = await Order.create(payload);
  await order.populate(['product', 'userId']);
  return order;
};
const updateOrderIntoDb = async (
  id: string,
  updateData: Partial<TOrderData>,
) => {
  const blog = await Order.findById(id);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order not found');
  }

  const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedOrder;
};
const getAllOrderFromDb = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail }).select('_id role');
  if (!user?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  // console.log(user.role, 'order service ');
  if (user?.role !== 'admin') {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'Only admin can access all orders',
    );
  }
  const orders = await Order.find().populate('product userId');
  return orders;
};
const getAllOrderForMeFromDb = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail }).select('_id role');
  if (!user?._id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const orders = await Order.find({ userId: user._id }).populate(
    'product userId',
  );
  return orders;
};
export const OrderService = {
  createOrderIntoDb,
  createOrderPaymentIntoDb,
  updateOrderIntoDb,
  getAllOrderFromDb,
  getAllOrderForMeFromDb,
};
// const getAllBookFromDb = async (query: Record<string, unknown>) => {
//   //   console.log(payload.price);
//   const searchAbleFields = ['name', 'author', 'category'];
//   const bookAfterFilter = new QueryBuilder(Book.find(), query)
//     .search(searchAbleFields)
//     .filter()
//     .sort();

//   const result = await bookAfterFilter.modelQuery.select(
//     '_id name content author quantity image price category description publicationYear',
//   );
//   // console.log('result', result);

//   return result;
// };
// const updateBookIntoDb = async (id: string, updateData: Partial<TBook>) => {
//   const blog = await Book.findById(id);
//   if (!blog) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'Book not found');
//   }

//   const updatedBlog = await Book.findByIdAndUpdate(id, updateData, {
//     new: true,
//   });

//   return updatedBlog;
// };
// const getSingleBookbyId = async (id: string) => {
//   //   console.log(payload.price);
//   const blog = await Book.findById(id);

//   return blog;
// };
// const deletedBookbyId = async (id: string) => {
//   //   console.log(payload.price);
//   const blog = await Book.findByIdAndDelete(id);

//   return blog;
// };
