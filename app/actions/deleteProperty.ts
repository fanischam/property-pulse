'use server';

import Property from '@/models/Property';
import { getSessionUser } from '../lib/auth/getSessionUser';
import { IProperty } from '@/types/types';
import { HydratedDocument } from 'mongoose';
import cloudinary from '../config/cloudinary';
import { revalidatePath } from 'next/cache';

const deleteProperty = async (propertyId: string) => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.id)
    throw new Error('User has to be logged in');

  const { id: userId } = sessionUser;

  const property: HydratedDocument<IProperty> | null = await Property.findById(
    propertyId
  );
  if (!property) throw new Error('Property not found');

  if (property.owner._id.toString() !== userId) {
    console.log(
      `typeof ownerId: ${typeof property.owner
        ._id}, typeof userId: ${typeof userId}`
    );
    console.log(`Prop owner: ${property.owner._id}, userId: ${userId}`);
    throw new Error('You should be the owner of this property to delete');
  }

  const publicImageIds = property.images.map((imgUrl) => {
    const parts = imgUrl.split('/');
    return parts.at(-1)?.split('.')[0];
  });

  if (publicImageIds.length > 0) {
    for (const publicId of publicImageIds)
      await cloudinary.uploader.destroy('propertypulse/' + publicId);
  }

  await property.deleteOne();

  revalidatePath('/', 'layout');
};

export default deleteProperty;
