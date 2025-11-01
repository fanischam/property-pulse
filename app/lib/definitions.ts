import * as z from 'zod';

export const SignUpFormSchema = z
  .object({
    name: z.string().min(4, 'Name should be at least 4 characters long'),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Length should be at least 8 characters long')
      .regex(/[a-zA-Z]/, 'Contain at least one letter')
      .regex(/[0-9]/, 'Contain at least one digit')
      .regex(
        /[^A-Za-z0-9]/,
        'Confirm Password must contain at least one special character'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormErrors = {
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type FormState = {
  status: number;
  message: string;
  errors?: FormErrors;
  fields?: {
    name?: string;
    email?: string;
  };
};
