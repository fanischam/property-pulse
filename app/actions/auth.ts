'use server';

import User from '@/models/User';
import { FormState, SignUpFormSchema } from '../lib/definitions';
import connectDb from '@/config/database';
import { z } from 'zod';

export const registerUser = async (
  _prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  await connectDb();

  const name = String(formData.get('name') ?? '');
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const confirmPassword = String(formData.get('confirmPassword') ?? '');

  const parsed = SignUpFormSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!parsed.success) {
    console.log(`Parsed: ${JSON.stringify(parsed)}`);
    const { fieldErrors, formErrors } = z.flattenError(parsed.error);

    return {
      status: 400,
      message: formErrors[0] ?? 'Account creation failed.',
      errors: fieldErrors,
      fields: { name, email },
    };
  }

  try {
    const {
      name: username,
      email: emailValue,
      password: passwordValue,
    } = parsed.data;

    const existingUser = await User.findOne({
      $or: [{ email: emailValue }, { username }],
    });

    if (existingUser) {
      const errors: FormState['errors'] = {};
      if (existingUser.email === emailValue)
        errors.email = ['Email is already in use'];
      if (existingUser.username === username)
        errors.name = ['Username is already taken'];

      return {
        status: 409,
        message: 'User already exists.',
        errors,
        fields: { name: username, email: emailValue },
      };
    }

    await User.create({
      username,
      email: emailValue,
      password: passwordValue,
    });

    return { status: 201, message: 'User created successfully!' };
  } catch (err) {
    console.error('Failed to create user:', err);
    return {
      status: 500,
      message: 'Failed to create user. Please try again later.',
      fields: { name, email },
    };
  }
};
