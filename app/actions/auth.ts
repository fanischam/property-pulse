import User from '@/models/User';
import { SignUpFormSchema } from '../lib/definitions';

export const registerUser = async (formData: FormData) => {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const existingUser = await User.findOne({
      email: validatedFields.data.email,
    });

    if (existingUser) {
      return {
        errors: {
          email: ['Email is already in use'],
        },
      };
    }

    await User.create({
      username: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });
  } catch (err: unknown) {
    console.error('Failed to create user: ', err);

    return {
      message: 'Failed to create user. Please try again later.',
    };
  }
};
