import { z } from 'zod';

const createBookValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Book name is required',
    }),
    description: z.string({
      required_error: 'Book description is required',
    }),
    image: z.string({
      required_error: 'Book image is required',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .positive('Price must be a positive number'),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .positive('Quantity must be a positive number'),

    author: z.string({
      required_error: 'Author is required',
    }),
    category: z.enum(
      ['Romance', 'Science Fiction', 'Mystery', 'Non-Fiction', 'Biography'],
      {
        required_error: 'Category is required',
      },
    ),
    publicationYear: z.number({
      required_error: 'Publication Year is required',
    }),
  }),
});

const updateBookValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Book name is required',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Book description is required',
      })
      .optional(),
    quantity: z
      .number({
        required_error: 'Quantity is required',
      })
      .positive('Quantity must be a positive number')
      .optional(),
    image: z
      .string({
        required_error: 'Book image is required',
      })
      .optional(),
    price: z.number().positive('Price must be a positive number').optional(),
    author: z
      .string({
        required_error: 'Author is required',
      })
      .optional(),
    category: z
      .enum(
        ['Romance', 'Science Fiction', 'Mystery', 'Non-Fiction', 'Biography'],
        {
          required_error: 'Category is required',
        },
      )
      .optional(),
    publicationYear: z
      .number({
        required_error: 'Publication Year is required',
      })
      .optional(),
  }),
});

export const BookValidation = {
  createBookValidationSchema,
  updateBookValidationSchema,
};
