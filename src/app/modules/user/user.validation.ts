import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object(
    {
      // id: z.string(),
      name: z.string().min(1),
      email: z.string().email(),
      password: z.string(),
      phone: z.string().min(1),
      address: z.string().min(1),
      role: z.enum(['admin', 'user']),
    }
  )
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().max(8).optional(),
    phone: z.string().min(1).optional(),
    address: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
  }),
});

export const UserValidation = {
  userValidationSchema,
  updateUserValidationSchema
};
