import { Metadata } from 'next';
import PropertyCard from '@/components/PropertyCard';
import connectDb from '@/config/database';
import Property from '@/models/Property';
import { IProperty } from '@/types/types';

export const metadata: Metadata = {
  title: 'Properties',
};

const PropertiesPage = async () => {
  await connectDb();
  const properties = await Property.find({}).lean<IProperty[]>();
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length == 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {properties.map((prop) => (
              <PropertyCard property={prop} key={prop._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
