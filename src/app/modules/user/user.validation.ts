import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'Name is required'),
    email: z.string().email('Invalid email format').min(1, 'Email is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});
const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});
const updatedUserValidationSchema = z.object({
  body: z.object({
    oldPassword: z
      .string({
        required_error: 'Old password is required',
      })
      .optional(),
    newPassword: z
      .string({ required_error: 'Password is required' })
      .optional(),
    address: z.string().optional(),
    name: z.string().trim().min(1, 'Name is required').optional(),
  }),
});

export const UserValidation = {
  registerUserValidationSchema,
  loginValidationSchema,
  changePasswordValidationSchema,
  updatedUserValidationSchema,
};
