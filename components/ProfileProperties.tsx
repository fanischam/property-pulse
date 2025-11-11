'use client';

import deleteProperty from '@/app/actions/deleteProperty';
import { IProperty } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ProfileProperties = ({
  properties: initialProperties,
}: {
  properties: Array<IProperty>;
}) => {
  const [properties, setProperties] =
    useState<Array<IProperty>>(initialProperties);

  const handleDelete = async (propertyId: string) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirm) return;

    await deleteProperty(propertyId);
    toast.success('Property deleted successfully');

    const updatedProperties = properties.filter(
      (prop) => prop._id !== propertyId
    );
    setProperties(updatedProperties);
  };

  return properties.map((prop) => (
    <div className='mb-10' key={prop._id}>
      <Link href={`/properties/${prop._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={prop.images[0]}
          width={1000}
          height={200}
          alt='Property 1'
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{prop.name}</p>
        <p className='text-gray-600'>
          Address: {prop.location.street} {prop.location.city}{' '}
          {prop.location.state}
        </p>
      </div>
      <div className='mt-2'>
        <a
          href={`/properties/${prop._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </a>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
          onClick={() => handleDelete(prop._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
