'use client';

import { IProperty } from '@/types/types';
import Image from 'next/image';
import { useState } from 'react';

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: Array<IProperty>;
}) => {
  const [properties, setProperties] =
    useState<Array<IProperty>>(initialProperties);

  return properties.map((prop) => (
    <div className='mb-10' key={prop._id}>
      <a href='/property.html'>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={prop.images[0]}
          width={1000}
          height={200}
          alt='Property 1'
        />
      </a>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{prop.name}</p>
        <p className='text-gray-600'>
          Address: {prop.location.street} {prop.location.city}{' '}
          {prop.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <a
          href='/add-property.html'
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </a>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
