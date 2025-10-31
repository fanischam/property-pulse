import Register from '@/components/Register';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Register User',
  description: 'Create a new account',
};

const RegisterPage = () => {
  return (
    <div className='flex flex-col items-center bg-gray-100 pb-14'>
      <h1 className='text-2xl text-gray-800 mt-24 mb-4 p-4'>Register</h1>
      <Register />
      <span>
        Already have an account?{' '}
        <Link href='/login' className='text-blue-500'>
          Login
        </Link>
      </span>
    </div>
  );
};

export default RegisterPage;
