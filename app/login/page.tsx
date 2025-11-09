import Login from '@/components/Login';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { verifyJwt } from '../lib/jwt';

const LoginPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value ?? '';
  const claims = token ? await verifyJwt(token) : null;
  if (claims) redirect('/');

  return (
    <div className='flex flex-col items-center bg-gray-100 pb-14'>
      <h1 className='text-2xl text-gray-800 mt-24 mb-4 p-4'>Login</h1>
      <Login />
      <span className='mt-2'>
        Don&apos;t have an account?{' '}
        <Link href='/register' className='text-blue-500'>
          Register
        </Link>
      </span>
    </div>
  );
};

export default LoginPage;
