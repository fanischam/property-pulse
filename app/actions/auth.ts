'use server';

import UserModel from '@/models/User';
import {
  LoginFormState,
  RegisterFormState,
  SignUpFormSchema,
} from '../lib/definitions';
import connectDb from '@/config/database';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { type User } from '../lib/auth/auth-types';

const createSessionToken = (userId: string) => {
  return `session_token_for_${userId}_${Date.now()}`;
};

const setSessionCookie = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
};

const clearSessionCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
};

export const registerUser = async (
  _prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
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

    const existingUser = await UserModel.findOne({
      $or: [{ email: emailValue }, { username }],
    });

    if (existingUser) {
      const errors: RegisterFormState['errors'] = {};
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

    const createdUser = await UserModel.create({
      username,
      email: emailValue,
      password: hashedPassword,
    });

    const user: User = {
      id: createdUser._id.toString(),
      name: createdUser.username,
      email: createdUser.email,
    };

    const token = createSessionToken(user.id);
    await setSessionCookie(token);

    return { status: 201, message: 'User created successfully!', user };
  } catch (err) {
    console.error('Failed to create user:', err);
    return {
      status: 500,
      message: 'Failed to create user. Please try again later.',
      fields: { name, email },
    };
  }
};

export const loginUser = async (
  _prevState: LoginFormState,
  formData: FormData
) => {
  await connectDb();

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');

  try {
    const userRecord = await UserModel.findOne({ email }).select('+password');

    if (!userRecord) {
      const errors: LoginFormState['errors'] = { email: ['User not found'] };

      return {
        status: 401,
        errors,
        message: 'Invalid email or password.',
        fields: { email },
      };
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);
    if (!isPasswordValid) {
      return {
        status: 401,
        errors: { password: ['Incorrect password'] },
        message: 'Invalid email or password.',
        fields: { email },
      };
    }

    const user: User = {
      id: userRecord._id.toString(),
      name: userRecord.username,
      email: userRecord.email,
    };

    const token = createSessionToken(user.id);
    await setSessionCookie(token);

    return { status: 200, message: 'Logged in successfully!', user };
  } catch (err) {
    console.error('Login failed:', err);
    return {
      status: 500,
      message: 'Login failed. Please try again later.',
      fields: { email },
    };
  }
};

export const logout = async () => {
  await clearSessionCookie();
  return { status: 200, message: 'Logged out successfully.' };
};
