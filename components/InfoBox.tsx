import Link from 'next/link';
import { ReactNode } from 'react';

type InfoBoxProps = {
  backgroundColor?: string;
  textColor?: string;
  title: string;
  buttonInfo: {
    text: string;
    buttonColor?: string;
    url: string;
  };
  children: ReactNode;
};

const InfoBox = ({
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  title,
  buttonInfo,
  children,
}: InfoBoxProps) => {
  const { text, url, buttonColor = 'bg-black' } = buttonInfo;
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{title}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <Link
        href={url}
        className={`${buttonColor} inline-block text-white rounded-lg px-4 py-2 hover:bg-blue-600`}
      >
        {text}
      </Link>
    </div>
  );
};

export default InfoBox;
