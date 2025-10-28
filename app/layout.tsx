import '@/assets/styles/globals.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Property Pulse',
    template: '%s | My App',
  },
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
