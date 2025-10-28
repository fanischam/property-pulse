import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className='container-xl lg:container m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg'>
          <InfoBox
            backgroundColor='bg-gray-100'
            title='For Renters'
            buttonInfo={{
              text: 'Browse Properties',
              url: '/properties',
            }}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            backgroundColor='bg-blue-100'
            title='For Property Owners'
            buttonInfo={{
              text: 'Add Property',
              buttonColor: 'bg-blue-500',
              url: '/properties/add',
            }}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
