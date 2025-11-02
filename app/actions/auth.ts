'use server';

import User from '@/models/User';
import { FormState, SignUpFormSchema } from '../lib/definitions';
import connectDb from '@/config/database';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

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

    const hashedPassword = await bcrypt.hash(passwordValue, 10);

    await User.create({
      username,
      email: emailValue,
      password: hashedPassword,
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

export const loginUser = async (formData: FormData) => {
  await connectDb();

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user || !user.password) {
      return {
        status: 401,
        message: 'Invalid email or password.',
        fields: { email },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        message: 'Invalid email or password.',
        fields: { email },
      };
    }

    return { status: 200, message: 'Login successful!' };
  } catch (err) {
    console.error('Login failed:', err);
    return {
      status: 500,
      message: 'Login failed. Please try again later.',
      fields: { email },
    };
  }
};
