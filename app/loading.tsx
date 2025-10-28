'use client';
import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '10px auto',
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color='#rb82f6'
      cssOverride={override}
      size={150}
      aria-label='Loading spinner'
    />
  );
};

export default LoadingPage;
