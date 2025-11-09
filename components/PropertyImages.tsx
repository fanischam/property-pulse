import Image from 'next/image';

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length === 1 ? (
          <Image
            src={images[0]}
            className='object-cover h-[400px] mx-auto rounded-xl'
            alt='Property image'
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {images.map((image, idx) => (
              <div
                key={idx}
                className={`${
                  images.length === 3 && idx === 2 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <Image
                  src={image}
                  className='object-cover h-[400px] w-full rounded-xl'
                  alt='Property image'
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
