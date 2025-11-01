'use client';

import { registerUser } from '@/app/actions/auth';
import { FormState } from '@/app/lib/definitions';
import { useActionState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [state, action, pending] = useActionState<FormState, FormData>(
    registerUser,
    { status: 0, message: '' }
  );

  useEffect(() => {
    if (!state) return;
    if (state.status === 201 && state.message) {
      toast.success(state.message);
      return;
    }
    const msg = state.message;
    if (msg && state.status && state.status !== 201) {
      toast.error(msg);
    }
  }, [state]);

  return (
    <form action={action} className='flex flex-col'>
      <label className='text-gray-800 p-2 rounded-lg mb-4 block'>
        Name:
        <div className='relative'>
          <input
            className={`border p-2 rounded-lg w-full pr-10 ${
              state?.errors?.name ? 'border-red-500' : 'border-gray-300'
            }`}
            defaultValue={state?.fields?.name ?? ''}
            type='text'
            name='name'
          />
          {state?.errors?.name && (
            <FaExclamationTriangle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
              size={16}
            />
          )}
        </div>
        {state?.errors?.name && (
          <p className='text-red-500 text-sm mt-1'>{state.errors.name[0]}</p>
        )}
      </label>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Email:
        <div className='relative'>
          <input
            className={`border p-2 rounded-lg w-full pr-10 ${
              state?.errors?.email ? 'border-red-500' : 'border-gray-300'
            }`}
            type='email'
            name='email'
            defaultValue={state?.fields?.email ?? ''}
          />
          {state?.errors?.email && (
            <FaExclamationTriangle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
              size={16}
            />
          )}
        </div>
        {state?.errors?.email && (
          <p className='text-red-500 text-sm mt-1'>{state.errors.email[0]}</p>
        )}
      </label>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Password:
        <div className='relative'>
          <input
            className={`border p-2 rounded-lg w-full pr-10 ${
              state?.errors?.password ? 'border-red-500' : 'border-gray-300'
            }`}
            type='password'
            name='password'
          />
          {state?.errors?.password && (
            <FaExclamationTriangle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
              size={16}
            />
          )}
        </div>
        {state?.errors?.password && (
          <p className='text-red-500 text-sm mt-1'>
            {state.errors.password[0]}
          </p>
        )}
      </label>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Confirm Password:
        <div className='relative'>
          <input
            className={`border p-2 rounded-lg w-full pr-10 ${
              state?.errors?.confirmPassword
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
            type='password'
            name='confirmPassword'
          />
          {state?.errors?.confirmPassword && (
            <FaExclamationTriangle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
              size={16}
            />
          )}
        </div>
        {state?.errors?.confirmPassword && (
          <p className='text-red-500 text-sm mt-1'>
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </label>
      <button
        className='bg-blue-500 m-4 text-white p-2 rounded-lg cursor-pointer disabled:opacity-50'
        disabled={pending}
        type='submit'
      >
        Register
      </button>
      <ToastContainer position='top-right' />
    </form>
  );
};

export default Register;
