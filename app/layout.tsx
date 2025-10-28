import { Metadata } from 'next';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import '@/assets/styles/globals.css';
import Footer from '@/components/Footer';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: 'Property Pulse',
    template: '%s | Property Pulse',
  },
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
