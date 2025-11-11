import EditPropertyForm from '@/components/EditPropertyForm';
import Property from '@/models/Property';
import connectDb from '@/config/database';
import { IProperty, RouteParams } from '@/types/types';

const EditPropertyPage = async (params: RouteParams) => {
  await connectDb();

  const { id } = await params.params;

  const propertyDoc = await Property.findById(id).lean<IProperty | null>();
  const property = JSON.parse(JSON.stringify(propertyDoc)) as IProperty;

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold m-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default EditPropertyPage;
