'use server';

import Property from '@/models/Property';
import { getSessionUser } from '../lib/auth/getSessionUser';
import connectDb from '@/config/database';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '../config/cloudinary';

const addProperty = async (formData: FormData) => {
  await connectDb();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.id) {
    throw new Error('User not authenticated');
  }

  const amenities = formData.getAll('amenities');
  const imageFiles = formData.getAll('images').filter(Boolean) as File[];

  const imageUrls = [];
  // Converts each uploaded image to base 64, so it can be uploaded to Cloudinary
  for (const image of imageFiles) {
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageDate = Buffer.from(imageArray);

    const imageBase64 = imageDate.toString('base64');

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'property-pulse',
      }
    );

    imageUrls.push(result.secure_url);
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
    amenities,
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
    images: imageUrls,
    owner: sessionUser.id,
  };

  console.log(propertyData);

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
};

export default addProperty;
