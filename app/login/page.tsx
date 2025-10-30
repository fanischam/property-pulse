import Login from '@/components/Login';
import Link from 'next/link';

const LoginPage = () => {
  return (
    <div className='flex flex-col items-center bg-gray-100 pb-14'>
      <h1 className='text-2xl text-gray-800 mt-24 mb-4 p-4'>Login</h1>
      <Login />
      <span>
        Don&apos;t have an account?{' '}
        <Link href='/register' className='text-blue-500'>
          Register
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
