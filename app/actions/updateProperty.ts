'use server';

import connectDb from '@/config/database';
import { getSessionUser } from '../lib/auth/getSessionUser';
import Property from '@/models/Property';
import { HydratedDocument } from 'mongoose';
import { IProperty } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const updateProperty = async (propertyId: string, formData: FormData) => {
  await connectDb();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User not authenticated');
  }

  const existingProperty: HydratedDocument<IProperty> | null =
    await Property.findById(propertyId);

  if (!existingProperty) throw new Error('Property not found');

  if (existingProperty.owner._id.toString() !== sessionUser.id) {
    throw new Error('You should be the owner of this property to edit');
  }

  const propertyData = {
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities: formData.getAll('amenities'),
    rates: {
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
      nightly: formData.get('rates.nightly.'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
    owner: sessionUser.id,
  };

  const updatedProperty: IProperty | null = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath('/', 'layout');

  redirect(`/properties/${updatedProperty!._id}`);
};

export default updateProperty;
