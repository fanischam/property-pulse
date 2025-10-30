'use client';

const Register = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Name:
        <input
          type='text'
          name='name'
          className='border border-gray-300 p-2 rounded-lg w-full'
        />
      </label>
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
      <label className='text-gray-800 p-2 rounded-lg mb-4'>
        Confirm Password:
        <input
          type='password'
          name='confirmPassword'
          className='border border-gray-300 p-2 rounded-lg w-full'
        />
      </label>
      <button
        type='submit'
        className='bg-blue-500 m-4 text-white p-2 rounded-lg'
      >
        Register
      </button>
    </form>
  );
};

export default Register;
