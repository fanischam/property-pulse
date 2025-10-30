'use client';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      router.push('/');
    } else {
      alert('Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Email:
        <input
          type='email'
          name='email'
          className='border border-gray-300 p-2 rounded-lg w-full'
        />
      </label>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Password:
        <input
          type='password'
          name='password'
          className='border border-gray-300 p-2 rounded-lg w-full'
        />
      </label>
      <button
        type='submit'
        className='bg-blue-500 m-2 text-white p-2 rounded-lg'
      >
        Login
      </button>
    </form>
  );
};

export default Login;
