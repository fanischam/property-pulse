'use client';

import { registerUser } from '@/app/actions/auth';
import { usePasswordValidation } from '@/app/hooks/usePasswordValidation';
import { FormState } from '@/app/lib/definitions';
import { FormEvent, useActionState, useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [state, action, pending] = useActionState<FormState, FormData>(
    registerUser,
    { status: 0, message: '' }
  );

  const {
    password,
    confirm,
    pwdErrors,
    confirmErrors,
    isValid,
    rules,
    onPasswordChange,
    onConfirmChange,
  } = usePasswordValidation();

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!isValid) {
      e.preventDefault();
      toast.error('Please fix password errors before submitting.');
    }
  };

  return (
    <form
      action={action}
      onSubmit={handleSubmit}
      className='flex flex-col w-84'
    >
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
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            aria-invalid={pwdErrors.length > 0}
            aria-describedby='password-help'
            autoComplete='new-password'
          />
          <ul id='password-help' className='mt-2 text-sm space-y-1'>
            <li className={rules.length ? 'text-green-600' : 'text-gray-600'}>
              {rules.length ? <FaCheckCircle className='inline mr-1' /> : '•'}{' '}
              At least 8 characters
            </li>
            <li className={rules.letter ? 'text-green-600' : 'text-gray-600'}>
              {rules.letter ? <FaCheckCircle className='inline mr-1' /> : '•'}{' '}
              Contains a letter
            </li>
            <li className={rules.digit ? 'text-green-600' : 'text-gray-600'}>
              {rules.digit ? <FaCheckCircle className='inline mr-1' /> : '•'}{' '}
              Contains a digit
            </li>
            <li className={rules.special ? 'text-green-600' : 'text-gray-600'}>
              {rules.special ? <FaCheckCircle className='inline mr-1' /> : '•'}{' '}
              Contains a special character
            </li>
          </ul>

          {pwdErrors.length > 0 && (
            <ul className='mt-2 space-y-0.5'>
              {pwdErrors.map((m, i) => (
                <li key={i} className='text-sm text-red-600'>
                  {m}
                </li>
              ))}
            </ul>
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
            value={confirm}
            onChange={(e) => onConfirmChange(e.target.value)}
            aria-invalid={confirmErrors.length > 0}
            autoComplete='new-password'
          />
          {confirmErrors.length > 0 && (
            <FaExclamationTriangle
              className='absolute right-3 top-1/2 -translate-y-1/2 text-red-500'
              size={18}
            />
          )}
        </div>
        {confirm.length > 0 && (
          <p
            className={`text-sm mt-2 ${
              rules.match ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {rules.match ? 'Passwords match' : 'Passwords do not match'}
          </p>
        )}
      </label>
      <button
        className='bg-blue-500 text-white p-3 rounded-lg cursor-pointer disabled:opacity-50 self-start md:self-auto'
        disabled={pending || !isValid}
        type='submit'
      >
        {pending ? 'Registering user...' : 'Register'}
      </button>
      <ToastContainer position='top-right' />
    </form>
  );
};

export default Register;
