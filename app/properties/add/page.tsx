import { verifyJwt } from '@/app/lib/jwt';
import AddPropertyForm from '@/components/AddPropertyForm';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Add Property',
};

const AddPropertyPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value ?? '';
  const claims = token ? await verifyJwt(token) : null;

  if (!claims) {
    redirect('/login?redirect=/properties/add');
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <AddPropertyForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
