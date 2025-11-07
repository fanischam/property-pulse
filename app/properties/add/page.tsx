import { verifyJwt } from '@/app/lib/jwt';
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

  return <div>Add Property</div>;
};

export default AddPropertyPage;
