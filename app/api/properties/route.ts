import connectDb from '@/config/database';
import Property from '@/models/Property';
import { IProperty } from '@/types/types';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDb();
    const properties = await Property.find({}).lean<IProperty>();
    return NextResponse.json(properties, { status: 200 });
  } catch {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
};
