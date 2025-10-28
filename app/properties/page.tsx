import { Metadata } from 'next';
import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';

export const metadata: Metadata = {
  title: 'Properties',
};

const PropertiesPage = () => {
  console.log(properties);
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
