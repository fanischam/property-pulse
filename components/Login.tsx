'use client';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      e.preventDefault();
      toast.error('Please fill in all fields.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col w-smart md:w-auto bg-white p-6 rounded-lg shadow-md'
    >
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
        className='bg-blue-500 m-4 text-white p-2 rounded-lg'
      >
        Login
      </button>
      <ToastContainer position='top-right' />
    </form>
  );
};

export default Login;
