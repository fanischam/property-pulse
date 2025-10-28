import { Metadata } from 'next';

// change page title
export const metadata: Metadata = {
  title: 'Property',
};

type PropertyPageProps = {
  params: {
    id: string;
  };
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;
  return <div>Property Page {id}</div>;
};

export default PropertyPage;
