import { Types } from 'mongoose';
import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(['cash', 'stripe'], {
      required_error: 'Payment method is required',
    }),
    product: z
      .string({
        required_error: 'Product ID is required',
      })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid Product ID',
      }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .positive('Quantity must be a positive number'),
    totalPrice: z
      .number({
        required_error: 'Total Price is required',
      })
      .positive('Price must be a positive number'),
    transactionId: z.string(),
    status: z
      .enum(['pending', 'confirm', 'cancel', 'delivered'])
      .default('pending')
      .optional(),

    userId: z
      .string({
        required_error: 'User ID is required',
      })
      .refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid User ID',
      }),
  }),
});

const updateOrderValidationSchema = z.object({
  body: z.object({
    paymentMethod: z.enum(['cash', 'stripe']).optional(),
    product: z.string().optional(),
    quantity: z
      .number()
      .positive('Quantity must be a positive number')
      .optional(),
    userId: z.string().optional(),
    status: z
      .enum(['pending', 'confirm', 'cancel', 'delivered'])
      .default('pending')
      .optional(),
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
  updateOrderValidationSchema,
};
